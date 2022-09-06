export interface Aluno {
  nome: string;
  matricula: number;
  disciplinas: Disciplina[];
}

export interface Disciplina {
  id: number;
  nome: string;
  provas: Prova[];
}

export interface Prova {
  id: number;
  nota: number;
}

export const alunos: Aluno[] = [
  {
    nome: 'João',
    matricula: 123,
    disciplinas: [
      {
        id: 1,
        nome: 'Matemática',
        provas: [
          {
            id: 1,
            nota: 80,
          },
          {
            id: 2,
            nota: 90,
          },
          {
            id: 3,
            nota: 100,
          },
          {
            id: 4,
            nota: 70,
          },
        ],
      },
      {
        id: 2,
        nome: 'Português',
        provas: [
          {
            id: 1,
            nota: 80,
          },
          {
            id: 2,
            nota: 90,
          },
          {
            id: 3,
            nota: 100,
          },
          {
            id: 4,
            nota: 100,
          },
        ],
      },
    ],
  },
];
