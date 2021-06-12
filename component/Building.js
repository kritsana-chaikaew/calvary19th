import React from "react";
import PropTypes from "prop-types";
import device from "../utils/device";

const Building = ({ name, ...props }) => {
  return (
    <div className="building" {...props}>
      <h1 className="name">{name}</h1>
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
            cursor: pointer;
          }
          .building:active {
            transform: translateY(4px);
          }
          .building:hover {
            transform: scale(1.01);
            border: solid #364239;
          }
          @media ${device.xs} {
            h1.name {
              font-size: 1em;
            }
          }
        `}
      </style>
    </div>
  );
};

Building.defaultProps = {
  name: "",
};

Building.propTypes = {
  name: PropTypes.string,
};

export default Building;
