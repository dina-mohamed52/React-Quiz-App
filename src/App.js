import { useEffect, useReducer } from 'react';
import Header from './Header'
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './startScreen';
import Question from './Question';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import NextButton from './NextButton';
import Timer from './Timer';



export default function App ()
{
  const initialState = {
    questions: [],
    // loading,error,ready ,active,finshied
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    reminingMinutes:null
  };
  const SEC_PER_Question =30;
  function reducer ( state, action )
  {
    switch (action.type) {
      case "datarecived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "datafailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          reminingMinutes: state.questions.length * SEC_PER_Question,
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQusetion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finished":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };

      case "restart":
        return {
          ...state,
          status: "ready",
          highscore: 0,
          index: 0,
          answer: null,
          points: 0,
        };
      case "tick":
        return {
          ...state,
          reminingMinutes: state.reminingMinutes - 1,
          status: state.reminingMinutes === 0 ? "finished" : state.status,
        };

      default:
        throw new Error("unknown action");
    }
    
  }
  const [
    { questions, status, index, answer, points, highscore, reminingMinutes },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numofquestions = questions.length;
  const maxPoints = questions.reduce( ( prev, curr ) => prev + curr.points, 0 );
   

  useEffect( function ()
  {
    async function Getdata ()
    {
      try
      {
        
        const res = await fetch( "http://localhost:8000/questions" );
        const data = await res.json();
        dispatch( { type: "datarecived", payload: data } );
        console.log( data );
      }
      catch ( err )
      {
        dispatch( { type: "datafailed" } );
      }
    }
    Getdata();
  }, [] );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numofquestions={numofquestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numofquestions={numofquestions}
              points={points}
              maxpoints={maxPoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            {/* next question */}
            <NextButton
              answer={answer}
              dispatch={dispatch}
              numofquestions={numofquestions}
              index={index}
            />
            <Timer dispatch={dispatch} reminingMinutes={reminingMinutes} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}