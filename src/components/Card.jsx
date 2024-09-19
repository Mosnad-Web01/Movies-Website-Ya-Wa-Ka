import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Circularprogress from "./CircularProgress";

const CardComponent = ({ image, loading, title, progress }) => {
  return (
    <Card shadow="sm" isPressable className="w-44 inline-flex m-2 relative overflow-hidden">
      <CardBody className="p-0 relative">
        {loading ? (
          <div className="w-full h-[140px] bg-gray-300 animate-pulse"></div>
        ) : (
          <>
            <Circularprogress progress={progress} />
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
      <CardFooter className="text-small justify-between">
        <b className="truncate">{title}</b> {/* Add truncate class for ellipsis */}
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
