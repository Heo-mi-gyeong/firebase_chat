const Button = ({ text, onclick, image, width, height, color, bgColor }) => {

  const btn = {
    width : width,
    height : height,
    lineHeight: height,
    backgroundColor: bgColor,
    color : color,
    border: 'none',
    textDecoration: 'none',
    borderRadius: '10px',
    textAlign : 'center',
    cursor : 'pointer',
    marginLeft: '5px',
  }

  const img = {
    width : width,
    height : height,
    marginLeft : '8px'
  }

  return (
    <div 
      onClick={onclick} style={image ? img : btn}>{text}
      {
        image ?
          <img src={image} style={img}></img>
          : ''
      }
    </div>
  )
}

export default Button