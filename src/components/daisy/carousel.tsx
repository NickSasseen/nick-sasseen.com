import React from "react";

const DaisyCarousel = ({ center = false, children }) => {
  const classes: string[] = [];
  center && classes.push("carousel-center");

  return (
    <div className={`carousel ${classes.join(" ")} w-full space-x-4 p-4`}>
      {children}
    </div>
  );
};

const DaisyCarouselItem = ({ className = "", children }) => {
  return <div className={"carousel-item ".concat(className)}>{children}</div>;
};

export { DaisyCarousel, DaisyCarouselItem };
