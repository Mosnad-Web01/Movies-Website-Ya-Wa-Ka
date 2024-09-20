// src/app/movies/components/MoviesCard.jsx
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const MoviesCard = ({ title, date, image }) => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
        <small className="text-default-500">{date}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Movie Poster"
          className="object-cover rounded-xl"
          src={image}
          width={270}
          height={380}
        />
      </CardBody>
    </Card>
  );
};

export default MoviesCard;
