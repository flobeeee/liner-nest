export class CreateHighlightDto {
  'userId': number;
  'pageUrl': string;
  'colorHex': string;
  'text': string;
}

export class UpdateHighlightDto {
  'userId': number;
  'highlightId': number;
  'colorHex'?: string;
  'text'?: string;
}
