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

  //State para armazenar em qual posição a conversa está
  const [posicao, setPosicao] = useState(0);

  const [alunoEscolhido, setAlunoEscolhido] = useState<Aluno | undefined>();
  const [materia, setMateria] = useState<Disciplina | undefined>();

  //Função que será chamada ao clicar no botão de enviar mensagem
  const enviarMsg = () => {
    let lista: Message[] = [];

    //Adiciona a mensagem enviada na lista vinda de você
    lista.push({ text: input, from: 'me' });

    //Ao digitar sair, seta para uma posição não existente nas condições
    if (input == 'sair') {
      setPosicao(4);
    }

    //Ao digitar voltar, volta ao começo
    if (input == 'voltar') {
      setPosicao(0);
      lista.push({
        text: 'Insira a mátricula do aluno desejado',
        from: 'them',
      });
    }

    //Na posição 0, faz a busca do aluno pelo seu id, em uma lista de alunos
    if (posicao == 0 && input != 'sair') {
      let aluno = alunos.filter(
        (aluno) => aluno.matricula == parseInt(input)
      )[0];
      //Armazena o aluno em um state para ser usado na posição 1
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

    //Na posição 1, busca a matéria pelo seu código do aluno guardado anteriormente
    if (posicao == 1 && input != 'sair') {
      let materia = alunoEscolhido?.disciplinas.filter(
        (materia) => materia.id == parseInt(input)
      )[0];
      //Armazena a matéria escolhida para ser utilizada na posição 2
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

    //Na posição 2, busca a prova pelo seu código da matéria guardada anteriormente
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

    //Verifica se o usuário deseja executar novamente ou sair do sistema
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

    //Se digitado limpar, apaga a lista e seta uma posição que não entra nas condicionais
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
