import React from "react"
import { Card as NextUICard, Skeleton } from "@nextui-org/react"
import Image from "next/image"

const Card = ({ image, loading, title }) => {
  return (
    <NextUICard className="w-[200px] space-y-5 p-4" radius="lg">
      {loading ? (
        <>
          <Skeleton className="rounded-lg">
            <div className="h-48 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
          </div>
        </>
      ) : (
        <>
          <Image
            className="w-full"
            src={`https://image.tmdb.org/t/p/w500/${image}`}
            alt={title}
            width={500}
            height={750}
          />
        </>
      )}
    </NextUICard>
  )
}

export default Card
