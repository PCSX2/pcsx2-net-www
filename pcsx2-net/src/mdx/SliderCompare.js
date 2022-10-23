import React, { useRef } from 'react';
import { Grid } from "@nextui-org/react";

export default function SliderCompare({ children, cols, before, after }) {
  let isDragging = false;

  const imgClipper = useRef(null);
  const beforeImg = useRef(null);
  const container = useRef(null);

  function handleMouseUp(event) {
    isDragging = false;
  };

  function handleMouseDownOrTouchStart(event) {
    isDragging = true;
    let elem = event.target;
    let rect = elem.getBoundingClientRect();
    let position = ((event.pageX - rect.left) / elem.offsetWidth) * 100;
    if (position <= 100) {
      imgClipper.current.style.width = position + "%";
      beforeImg.current.style.width = ((100 / position) * 100) + "%";
      beforeImg.current.style.zIndex = 3;
    }
  };

  function handleMouseMove(event) {
    if (!isDragging) {
      return;
    }
    let elem = event.target;
    let rect = elem.getBoundingClientRect();
    let position = ((event.pageX - rect.left) / elem.offsetWidth) * 100;
    if (position <= 100) {
      imgClipper.current.style.width = position + "%";
      beforeImg.current.style.width = ((100 / position) * 100) + "%";
      beforeImg.current.style.zIndex = 3;
    }
  }

  // We don't know the sizes of the images until they are loaded
  // its technically best practice to put the size in the DOM but this would be
  // incredibly painful to do from a writing perspective
  function imageLoaded(event) {
    let aspectRatio = event.target.naturalWidth / event.target.naturalHeight;
    container.current.style["aspect-ratio"] = aspectRatio;
  }

  return (
    <Grid.Container>
      <Grid xs={12} md={Math.min(12, cols ?? 12)}>
        <div ref={container} className="img-compare-container"
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDownOrTouchStart}
          onTouchStart={handleMouseDownOrTouchStart}
          onMouseMove={handleMouseMove}>
          <img src={after} loading="lazy" alt="" draggable="false" onLoad={imageLoaded} />
          <div ref={imgClipper} className="img-clipper">
            <img ref={beforeImg} src={before} loading="lazy" alt="" draggable="false" />
            <div className="img-cmp-label before">Before</div>
          </div>
          <div className="img-cmp-label after">After</div>
        </div>
      </Grid>
    </Grid.Container>
  );
}
