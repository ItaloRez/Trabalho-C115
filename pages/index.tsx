import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';
import { alunos, Aluno, Disciplina } from '../data/alunos';

interface Message {
  text: string;
  from: string;
}

const Home: NextPage = () => {
  const [msgList, setMsgList] = useState<Message[]>([
    { text: 'Bom dia! 😁', from: 'them' },
    { text: 'Insira a mátricula do aluno desejado', from: 'them' },
  ]);
  const [input, setInput] = useState('');
  const [posicao, setPosicao] = useState(0);

  const [alunoEscolhido, setAlunoEscolhido] = useState<Aluno | undefined>();
  const [materia, setMateria] = useState<Disciplina | undefined>();

  const enviarMsg = () => {
    let lista: Message[] = [];
    lista.push({ text: input, from: 'me' });

    if (input == 'sair') {
      setPosicao(4);
    }

    if (input == 'voltar') {
      setPosicao(0);
      lista.push({
        text: 'Insira a mátricula do aluno desejado',
        from: 'them',
      });
    }

    if (posicao == 0 && input != 'sair') {
      let aluno = alunos.filter(
        (aluno) => aluno.matricula == parseInt(input)
      )[0];
      setAlunoEscolhido(aluno);
      if (aluno) {
        lista.push({
          text: `O aluno ${aluno.nome} foi escolhido.`,
          from: 'them',
        });
        lista.push({
          text: 'Insira o código da máteria que deseja',
          from: 'them',
        });
        setPosicao(1);
      } else {
        lista.push({
          text: `Aluno não encontrado.`,
          from: 'them',
        });
      }
    }

    if (posicao == 1 && input != 'sair') {
      let materia = alunoEscolhido?.disciplinas.filter(
        (materia) => materia.id == parseInt(input)
      )[0];
      setMateria(materia);
      if (materia) {
        lista.push({
          text: `A matéria ${materia.nome} foi escolhida.`,
          from: 'them',
        });
        lista.push({
          text: 'Insira o código da prova que deseja',
          from: 'them',
        });
        setPosicao(2);
      } else {
        lista.push({
          text: `Matéria não encontrada.`,
          from: 'them',
        });
      }
    }

    if (posicao == 2 && input != 'sair') {
      let prova = materia?.provas.filter(
        (prova) => prova.id == parseInt(input)
      )[0];
      if (prova) {
        lista.push({
          text: `A nota da prova é ${prova.nota}`,
          from: 'them',
        });
        lista.push({
          text: 'Deseja consultar outra nota? (s/n)',
          from: 'them',
        });
        setPosicao(3);
      } else {
        lista.push({
          text: `Prova não encontrada.`,
          from: 'them',
        });
      }
    }

    if (posicao == 3 && input != 'sair') {
      if (input == 's') {
        lista.push({
          text: 'Insira a mátricula do aluno desejado',
          from: 'them',
        });
        setPosicao(0);
      } else {
        lista.push({
          text: `Obrigado por usar o sistema.`,
          from: 'them',
        });
        setPosicao(4);
      }
    }

    if (input == 'limpar') {
      setMsgList([{ text: 'limpar', from: 'me' }]);
      setPosicao(4);
    } else {
      setMsgList([...msgList, ...lista]);
    }
    setInput('');
  };

  return (
    <>
      <Head>
        <title>ChatBot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="imessage">
          {msgList.map((msg, i) => {
            return (
              <p key={i} className={msg.from == 'me' ? 'from-me' : 'from-them'}>
                {msg.text}
              </p>
            );
          })}
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Escreva uma mensagem"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button onClick={enviarMsg}>
            <IoSend />
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
