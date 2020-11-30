export class CompletedOptionVo {
  id: number;
  label: string;
  value: boolean;

  constructor(id: number, label: string, value: boolean) {
    this.id = id;
    this.label = label;
    this.value = value;
  }
}
