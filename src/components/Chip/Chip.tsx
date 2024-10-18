import { Status } from "../../utils/types/client";

const Chip = ({ status }: { status: Status }) => {
  let style;
  switch (status) {
    case Status.CONTACTED:
      style = {
        backgroundColor: "green",
        color: "white",
      };
      break;
    case Status.NOT_CONTACTED:
      style = {
        backgroundColor: "red",
        color: "white",
      };
      break;
    case Status.CONTACT_IN_FUTURE:
      style = {
        backgroundColor: "blue",
        color: "white",
      };
      break;
    default:
      break;
  }
  return (
    <div
      style={{
        padding: "5px",
        borderRadius: "30px",
        ...style,
      }}
    >
      {status}
    </div>
  );
};

export default Chip;
