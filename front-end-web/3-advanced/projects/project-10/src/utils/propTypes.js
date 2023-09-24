import PropTypes from "prop-types";

const propTypes = {
  text: {
    type: ["default", "secondary", "success", "warning", "danger"],
    code: PropTypes.bool,
    mark: PropTypes.bool,
    keyboard: PropTypes.bool,
    disabled: PropTypes.bool,
    underline: PropTypes.bool,
    strong: PropTypes.bool,
    italic: PropTypes.bool,
    text: PropTypes.string,
  },
  input: {
    bordered: PropTypes.bool,
    disabled: PropTypes.bool,
    size: ["large", "middle", "small"],
  },
  select: {
    showSearch: PropTypes.bool,
    allowClear: PropTypes.bool,
    bordered: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    open: PropTypes.bool,
    placement: ["bottomLeft", "bottomRight", "topLeft", "topRight"],
    size: ["large", "middle", "small"],
    status: ["default", "error", "warning"],
    options: PropTypes.arrayOf(PropTypes.string),
  },
};
export default propTypes;
