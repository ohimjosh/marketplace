type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

export default function Distance({ leg }: DistanceProps) {
  if (!leg.distance || !leg.duration) return null;

  

  return (
    <div>
      <p>
        It will take <span className="highlight">{leg.duration.text}</span> to arrive to your destination of <span className="highlight">{leg.distance.text}</span>. 
      </p>

    </div>
  );
}
