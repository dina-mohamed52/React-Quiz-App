function NextButton ({answer,dispatch ,index,numofquestions})
{
    const hasAnswer = answer !== null;
    return (
        <div>
                            {/* next button */}
            { index < numofquestions-1 && hasAnswer && 
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQusetion" })}
              >
                next
              </button>
            }  
                              {/* finish button */}
            { index === numofquestions-1 && hasAnswer && 
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finished" })}
              >
                finish
              </button>
             }  
        </div>
    )
}

export default NextButton
