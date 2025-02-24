
import './input.scss'
import PropTypes from "prop-types";


export const Input = ({value,setValue, type = "text", placeholder = ""}) =>{
	return (
		<input onChange={(event) => setValue(event.target.value)} value={value} type={type} placeholder={placeholder}/>
	)
}



Input.propTypes = {
	value: PropTypes.string,
	setValue: PropTypes.func,
	type: PropTypes.string,
	placeholder: PropTypes.string,
  };