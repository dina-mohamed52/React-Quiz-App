function Progress({ index, numofquestions,points,maxpoints ,answer }) {
  return (
    <header className="progress">
      <progress max={numofquestions} value={index + Number(answer !== null)} />
      <p>
        question{index + 1} / {numofquestions}
      </p>
      <p>
        {points} / {maxpoints}
      </p>
    </header>
  );
}

export default Progress
