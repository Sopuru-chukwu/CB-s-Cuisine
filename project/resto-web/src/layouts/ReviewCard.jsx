import React from "react";

const ReviewCard = (props) => {
  return (
    <div className="w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-lg">
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          earum necessitatibus odit doloremque unde ipsum sit quas suscipit
          culpa excepturi sapiente ad, voluptates tempore hic fugit vel quae
          molestiae voluptas. Necessitatibus voluptas quisquam esse dolor. Fuga
          repellendus sapiente repellat enim.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center mt-8 gap-4">
        <img className="rounded-full w-16 h-16" src={props.img} alt={props.name} />
        <h3 className="font-semibold">{props.name}</h3>
      </div>
    </div>
  );
};

export default ReviewCard;
