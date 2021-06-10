import React from "react";
import PropTypes from "prop-types";

const Building = ({ title, items,  ...props }) => {
  return (
    <div className="building" {...props}>
      <h1 className="title">{title}</h1>
      <style jsx>
        {`
          .building {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            text-align: center;
            border: 1px solid grey;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .title {
          }
        `}
      </style>
    </div>
  );
};
Building.defaultProps = {
  title: "",
  items: []
};
Building.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default Building;
