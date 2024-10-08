import "./ButtonList.css";
import Button from "./Button";

export  default  function ButtonList({
  totalResults,
  resultsPerPage,
  currentPage = 1,
}: {
  totalResults: number;
  resultsPerPage: number;
  currentPage?: number;
}) {
  const maxPages = Math.ceil(totalResults / resultsPerPage);
  let firstButton: number, lastButton: number;
  let buttonElements = [];
  //handling all cases
  if (currentPage <= 2) {
    //edge case 1(if currentPage is 1 or 2)
    firstButton = 1;
    lastButton = maxPages < 5 ? maxPages : 5;
  } else if (maxPages - currentPage <= 1) {
    //edge case 2(if maxPages - currentPage < 2 )
    lastButton = maxPages;
    firstButton = maxPages - 4 <= 0 ? 1 : maxPages - 4;
  } else {
    //regular case
    firstButton = currentPage - 2;
    lastButton = currentPage + 2;
  }

  // console.log(
  //   `firstButton: ${firstButton} \n lastButton: ${lastButton} \n maxPages=${maxPages} \n currentPage = ${currentPage}`
  // );
  for (let i = firstButton; i <= lastButton; i++) {
    buttonElements.push(
      <Button key={i} value={i} text={i.toString()} className={`page-btn ${i == currentPage && `page-btn-active`}`} />
    );
  }

  return (
    <div className="btn-list-container">
      {firstButton !== 1 && (
        <Button value={1} text="<<" className="navigation-btn" />
      )}
      {currentPage > 1 && (
        <Button value={currentPage - 1} text="<" className="navigation-btn" />
      )}
      {buttonElements}
      {currentPage < maxPages && (
        <Button value={currentPage + 1} text=">" className="navigation-btn" />
      )}
      {lastButton !== maxPages && (
        <Button value={maxPages} text=">>" className="navigation-btn" />
      )}
    </div>
  );
}
