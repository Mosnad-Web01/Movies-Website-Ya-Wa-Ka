import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Circularprogress from "./CircularProgress";

const CardComponent = ({
  image,
  loading,
  title,
  progress,
  date,
  customClass,
  isActor = false, // New prop to determine if the card is for an actor
}) => {
  return (
    <Card
      shadow="sm"
      isPressable
      className={`inline-flex m-2 relative overflow-hidden ${customClass || "w-48"}`}
    >
      <CardBody className="p-0 relative">
        {loading ? (
          <div className="w-full h-[140px] bg-gray-300 animate-pulse"></div>
        ) : (
          <>
            {!isActor && progress !== undefined && ( // Only show progress if not an actor and progress is provided
              <Circularprogress progress={progress} />
            )}
            <Image
              className="w-full object-cover h-[140px]"
              src={image}
              alt={title}
              width={350}
              height={250}
            />
          </>
        )}
      </CardBody>
      <CardFooter className="text-small flex flex-col items-center">
        <b className="truncate w-full max-w-full whitespace-nowrap overflow-hidden">{title}</b>
        {date && <small>{date}</small>} {/* Show date only if provided */}
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
