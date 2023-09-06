import React from 'react'
import PropTypes from 'prop-types'

function CategoryButton({
  text,
  focused,
  onClick,
}: {
  text: string
  focused: string
  onClick: any
}) {
  const defaultStyle =
    'bg-buttonDark border-4 border-buttonDark text-white cursor-pointer px-5 py-1 rounded-[45px] h-10 w-200px hover:bg-buttonHover hover:border-buttonHover'
  const focusedStyle =
    'bg-buttonDark border-4 border-textLight text-white cursor-pointer px-5 py-1 rounded-[45px] h-10 w-200px'

  return (
    <div
      onClick={() => onClick(text)}
      className={text === focused ? focusedStyle : defaultStyle}
      data-testid="categoryButton"
    >
      <p className="whitespace-nowrap" data-testid="categoryText">
        {' '}
        {text}
      </p>
    </div>
  )
}

CategoryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CategoryButton
