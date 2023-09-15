function Question ( { questions, answer, dispatch } )
{
    const hasAnswer = answer !== null;
    return (
      <div>
        <h4>{questions.question}</h4>
        <div className="options">
          {questions.options.map((options, index) => (
            <button
              className={`btn btn-option ${answer === index ? "answer" : ""}  ${
                hasAnswer
                  ? index === questions.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              key={index}
              disabled={hasAnswer}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
            >
              {options}
            </button>
          ))}
         
        </div>
      </div>
    );
}

export default Question
