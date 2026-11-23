import {QuestionOption} from '../types/course';

export interface ParsedQuestionDraft {
  questionNumber: string;
  prompt: string;
  statements: string[];
  options: QuestionOption[];
  correctLetter: string;
}

const OPTION_HEADER_REGEX = /^([A-Ea-e])[.)\-:]\s*(.*)$/;
const NUMBERED_ITEM_REGEX = /^(\d{1,2})[.)\-:]\s+(.+)$/;
const QUESTION_HEADER_REGEX = /^(Pregunta\s*\d+)\s*(?:Respuesta.*)?$/i;
const ANSWER_HINT_REGEX =
  /(?:donde\s+la\s+respuesta\s+es|respuesta\s*(?:correcta)?\s*[:\-]?\s*)([A-Ea-e])\b/i;

export function parseRawQuestionText(rawInput: string): ParsedQuestionDraft {
  const normalized = rawInput.replace(/\r\n/g, '\n').trim();
  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let questionNumber = '';
  let detectedCorrect = '';
  const promptLines: string[] = [];
  const statements: string[] = [];
  const options: QuestionOption[] = [];

  let mode: 'prompt' | 'statements' | 'options' = 'prompt';
  let pendingOptionLetter: string | null = null;

  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];

    // Extract inline answer hint if present (e.g. "C. 2, 4, 5 donde la respuesta es c")
    const hintMatch = line.match(ANSWER_HINT_REGEX);
    if (hintMatch) {
      detectedCorrect = hintMatch[1].toUpperCase();
      line = line.replace(ANSWER_HINT_REGEX, '').trim();
      if (!line) {
        continue;
      }
    }

    // Detect "Pregunta 1Respuesta" or "Pregunta 1"
    const qHeaderMatch = line.match(QUESTION_HEADER_REGEX);
    if (qHeaderMatch) {
      questionNumber = qHeaderMatch[1].replace(/\s+/g, ' ');
      continue;
    }

    // Ignore Moodle / LMS boilerplate lines
    if (/^(Respuesta|Marcar pregunta|Sin responder aún|Puntúa como)/i.test(line)) {
      continue;
    }

    // Check if line starts an option (e.g. "A." or "A. 1, 3, 4" or "a) texto")
    const optionMatch = line.match(OPTION_HEADER_REGEX);
    if (optionMatch) {
      mode = 'options';
      const letter = optionMatch[1].toUpperCase();
      const inlineText = optionMatch[2].trim();

      if (inlineText.length > 0) {
        options.push({letter, text: inlineText});
        pendingOptionLetter = null;
      } else {
        // Option text appears on the next line (common when copying from Moodle)
        pendingOptionLetter = letter;
      }
      continue;
    }

    // If previous line was a standalone option letter like "A."
    if (pendingOptionLetter) {
      options.push({letter: pendingOptionLetter, text: line});
      pendingOptionLetter = null;
      continue;
    }

    // Check numbered statement item (e.g. "1. La falta de acceso a Internet")
    const numberedMatch = line.match(NUMBERED_ITEM_REGEX);
    if (numberedMatch && mode !== 'options') {
      mode = 'statements';
      statements.push(numberedMatch[2].trim());
      continue;
    }

    if (mode === 'options' && options.length > 0) {
      // Continuation line of the last option
      const last = options[options.length - 1];
      last.text = `${last.text} ${line}`.trim();
    } else if (mode === 'statements' && statements.length > 0) {
      // Continuation line of the last numbered item
      statements[statements.length - 1] = `${statements[statements.length - 1]} ${line}`.trim();
    } else {
      promptLines.push(line);
    }
  }

  // Ensure at least two editable option slots if none or one was parsed
  const finalOptions =
    options.length >= 2
      ? options
      : options.length === 1
        ? [...options, {letter: 'B', text: ''}]
        : [
            {letter: 'A', text: ''},
            {letter: 'B', text: ''},
            {letter: 'C', text: ''},
          ];

  const validCorrect = finalOptions.some((opt) => opt.letter === detectedCorrect)
    ? detectedCorrect
    : finalOptions[0]?.letter || 'A';

  return {
    questionNumber: questionNumber || 'Pregunta',
    prompt: promptLines.join(' ').trim(),
    statements,
    options: finalOptions,
    correctLetter: validCorrect,
  };
}
