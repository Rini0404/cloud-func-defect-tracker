
export enum DefectCategory {
  HumanError = 'HumanError',
  MachineError = 'MachineError',
  ManufacturerError = 'ManufacturerError'
}

export enum DefectType {
  // Human Error
  FoldOver = 'FoldOver',
  UpsideDown = 'UpsideDown',
  Ghost = 'Ghost',
  Color = 'Color',
  Bruised = 'Bruised',
  TopBottomVoid = 'TopBottomVoid',
  TiltVoid = 'TiltVoid',
  Degree180 = 'Degree180',
  Mismatch = 'Mismatch',
  SizeMixUp = 'SizeMixUp',
  Overlap = 'Overlap',
  SidewaysFade = 'SidewaysFade',

  // Machine Error
  Blur = 'Blur',
  Crispy = 'Crispy',
  Faded = 'Faded',
  PrintError = 'PrintError',
  Discoloration   = 'Discoloration',

  // Manufacturer Error
  ThreadVoid = 'ThreadVoid',
  FoldVoid = 'FoldVoid',
  HeelVoid = 'HeelVoid',
  FaultyYarn = 'FaultyYarn',
  Holes = 'Holes',
}

interface DefectData {
  [key: string]: any; // or a more specific type for your defect data
}

export interface DefectsByCategory {
  [category: string]: {
      [type: string]: DefectData[];
  };
}
