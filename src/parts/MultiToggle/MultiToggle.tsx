import React from 'react';

type Props = {
  tabTitles: Array<string>,
  onChangeChosenElement: (idx: number) => void,
}

const MultiToggle = ({
                       tabTitles,
                       onChangeChosenElement,
                     }: Props) => {

  const onClickToggle = (e: React.SyntheticEvent<HTMLSpanElement>) => {
    const idx = Number(e.currentTarget.dataset.chosenIdx);
      onChangeChosenElement(idx);
  };

  return (
    <div>
      {tabTitles.map((el: string, idx: number) => {
        return (
          <span
                data-chosen-idx={idx}
                key={el + idx}
                onClick={onClickToggle}
          >
          {el}
        </span>)
      })}
    </div>
  )
};

export default MultiToggle;