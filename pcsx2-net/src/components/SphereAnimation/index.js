import React, { useRef, useEffect } from 'react';

export class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas angle={this.state.angle} />
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);

    this.initialSpheres = 25;
    this.maxVelocity = 0.25;
    this.minVelocity = -0.25;
    this.maxTtl = 10000;
    this.maxRadius = 6;
    this.minRadius = 2;
    this.spheres = [];
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.frameCount = 0;

    this.colors = [
      "#00d4ca", "#ff5653", "#8dbbf2", "#f887d6"
    ]
  }

  saveContext(ctx) {
    this.ctx = ctx;
  }

  resizeCanvas = () => {
    const dpr = window.devicePixelRatio;
    const rect = this.ctx.canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    this.ctx.canvas.width = rect.width * dpr;
    this.ctx.canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    this.ctx.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    this.ctx.canvas.style.width = `${rect.width}px`;
    this.ctx.canvas.style.height = `${rect.height}px`;
  }
  componentDidMount() {
    this.resizeCanvas();
  }

  componentDidUpdate() {
    const { angle } = this.props;
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height)
    // Create spheres if it hasnt been done before
    if (this.spheres.length === 0) {
      // TODO - issue if they resize probably?
      // TODO - temp larger size when spawning in?
      for (let i = 0; i < this.initialSpheres; i++) {
        this.spheres.push({
          x: Math.random() * this.ctx.canvas.width,
          y: Math.random() * this.ctx.canvas.height,
          r: Math.random() * this.maxRadius + this.minRadius,
          color: this.colors[Math.floor(Math.random() * 4)],
          xvel: Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity,
          yvel: Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity,
          ttl: this.frameCount + (Math.random() * this.maxTtl + 50),
          flipVel: false
        });
      }
    }

    // Update the position of all spheres
    for (let i = 0; i < this.spheres.length; i++) {
      // See if we should adjust the velocity to avoid the mouse (flip it)
      if (this.mouseX && this.mouseY) {
        const dist = Math.sqrt(Math.pow((this.spheres[i].x - mouseX), 2) + Math.pow((this.spheres[i].y - mouseY), 2));
        this.spheres[i].flipVel = dist < 50.0;
      } else {
        this.spheres[i].flipVel = false;
      }

      if (this.spheres[i].flipVel) {
        this.spheres[i].x += this.spheres[i].xvel * -1.0;
        this.spheres[i].y += this.spheres[i].yvel * -1.0;
      } else {
        this.spheres[i].x += this.spheres[i].xvel;
        this.spheres[i].y += this.spheres[i].yvel;
      }

      if (
        this.spheres[i].ttl < this.frameCount
        || (this.spheres[i].x - this.spheres[i].r) <= 0
        || (this.spheres[i].y - this.spheres[i].r) <= 0
        || (this.spheres[i].x + this.spheres[i].r) >= this.ctx.canvas.width
        || (this.spheres[i].y + this.spheres[i].r) >= this.ctx.canvas.height
      ) {
        // re-init the sphere
        this.spheres[i] = {
          x: Math.random() * this.ctx.canvas.width,
          y: Math.random() * this.ctx.canvas.height,
          r: Math.random() * this.maxRadius + this.minRadius,
          color: this.colors[Math.floor(Math.random() * 4)],
          xvel: Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity,
          yvel: Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity,
          ttl: this.frameCount + (Math.random() * this.maxTtl + 50)
        }
      }
    }

    // Draw lines between spheres if they are close enough
    for (let i = 0; i < this.spheres.length; i++) {
      for (let j = 0; j < this.spheres.length; j++) {
        const dist = Math.sqrt(Math.pow((this.spheres[i].x - this.spheres[j].x), 2) + Math.pow((this.spheres[i].y - this.spheres[j].y), 2));
        if (dist <= 200.0) {
          const alpha = 1.0 - (dist / 200.0);
          if (alpha > 1.0) {
            alpha = 1.0;
          } else if (alpha < 0.0) {
            alpha = 0.0;
          }

          let color = this.spheres[i].color;
          if (this.spheres[j].r > this.spheres[i].r) {
            color = this.spheres[j].color;
          }
          let alphaValue = Math.round(alpha * 255).toString(16).padStart(2, '0');
          this.ctx.beginPath()
          this.ctx.strokeStyle = `${color}${alphaValue}`;
          this.ctx.moveTo(this.spheres[i].x, this.spheres[i].y);
          this.ctx.lineTo(this.spheres[j].x, this.spheres[j].y);
          this.ctx.stroke();
        }
      }
    }

    for (let i = 0; i < this.spheres.length; i++) {
      this.ctx.beginPath()
      this.ctx.arc(this.spheres[i].x, this.spheres[i].y, this.spheres[i].r, 0, 2 * Math.PI)
      this.ctx.fillStyle = this.spheres[i].color
      this.ctx.fill()
    }
    this.ctx.restore();
  }

  render() {
    return <PureCanvas contextRef={this.saveContext}></PureCanvas>;
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate() { return false; }

  render() {
    return (
      <canvas ref={node => node ? this.props.contextRef(node.getContext('2d')) : null} style={{
        position: "absolute",
        height: "calc(84vh - 76px)",
        "@xsMax": {
          height: "calc(100vh - 64px)",
        },
        width: "100%"
      }} />
    )
  }
}
