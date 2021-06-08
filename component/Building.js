import React from "react";
import PropTypes from "prop-types";

const Building = ({ title, ...props }) => {
  return (
    <div className="building" {...props}>
      {title}
      <style jsx>{`
        .building {
          height: 6rem;
          width: 100%;
          text-align: center;
          border: 1px solid grey;
          background-color: #fff;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        `}
      </style>
    </div>
  );
};
Building.defaultProps = {
  title: ""
};
Building.propTypes = {
  title: PropTypes.string
};

export default Building;