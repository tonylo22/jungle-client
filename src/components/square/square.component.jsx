import { useContext } from "react";
import { BoardContext } from "../../context/board.context";
import { TERRAIN } from "../../game-classes/constants.class";
import "./square.style.css";
import { ReactComponent as Elephant} from "../../assets/icons/elephant.svg";
import { ReactComponent as Lion} from "../../assets/icons/lion.svg";
import { ReactComponent as Tiger} from "../../assets/icons/tiger.svg";
import { ReactComponent as Leopard} from "../../assets/icons/leopard.svg";
import { ReactComponent as Wolf} from "../../assets/icons/wolf.svg";
import { ReactComponent as Dog} from "../../assets/icons/dog.svg";
import { ReactComponent as Cat} from "../../assets/icons/cat.svg";
import { ReactComponent as Rat} from "../../assets/icons/rat.svg";
import { ReactComponent as Den} from "../../assets/icons/den.svg";
import { ReactComponent as Trap} from "../../assets/icons/trap.svg";
import { ReactComponent as River } from "../../assets/icons/river.svg";

const renderAnimal = (animal, fill) => {
  const components = {
    elephant: <Elephant fill={fill} />,
    lion: <Lion fill={fill} />,
    tiger: <Tiger fill={fill}/>,
    leopard: <Leopard fill={fill}/>,
    wolf: <Wolf fill={fill}/>,
    dog: <Dog fill={fill}/>,
    cat: <Cat fill={fill}/>,
    rat: <Rat fill={fill}/>
  }
  return components[animal]
}


const Square = ({row, col, animal, isLand, isSelected}) => {
  const { tryAction } = useContext(BoardContext);
  const isRiver = TERRAIN[row][col] === "river";
  
  const handleClick = (event) => {
    const target = event.currentTarget.id;
    tryAction(target);
  }

  let content;
  if (animal) {
    const color = animal.includes("-")? "#ad1203": "#0b5e99";
    content = renderAnimal(animal.replace("-", ""), color);
  }
  else {
    content = TERRAIN[row][col] === "den" || TERRAIN[row][col] === "-den" ? <Den fill={"#353535"} />:
              TERRAIN[row][col] === "trap"? <Trap fill={"#353535"} /> :
              isRiver ? <River />: "" ;
  }

  const className = `square${isRiver?" river":""}${isLand?" land":""}${isSelected?" selected":""}`;
  return (<div id={`${row}${col}`} onClick={handleClick} className={className}>{content}</div>)
}

export default Square;