import { Shape } from "./shape";

export class ShapeFactory {

  static shapes = [
    ShapeFactory.i, 
    ShapeFactory.o,
    ShapeFactory.j,
    ShapeFactory.l,
    ShapeFactory.s,
    ShapeFactory.t,
    ShapeFactory.z,
  ]

  static getRandom(): Shape {
    const totalShapes = this.shapes.length;
    const randomShapeIndex = Math.floor(Math.random() * totalShapes);
    
    return this.shapes[randomShapeIndex]();
  }

  static i(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[1, 1, 1, 1], 
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
    shape.fillStyle = '#F60005';
    shape.strokeStyle = '#F56F74';

    return shape;
  }
  
  static o(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[1, 1], 
                    [1, 1]];
    shape.fillStyle = '#003AF4';
    shape.strokeStyle = '#6F8FF8';

    return shape;
  }

  static j(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[1, 0, 0], 
                    [1, 1, 1],
                    [0, 0, 0]];
    shape.fillStyle = '#F9DB34';
    shape.strokeStyle = '#FBEB8B';

    return shape;
  }

  static l(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[0, 0, 1], 
                    [1, 1, 1],
                    [0, 0, 0]];
    shape.fillStyle = '#C904F3';
    shape.strokeStyle = '#D284F4';

    return shape;
  }

  static s(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[0, 1, 1], 
                    [1, 1, 0],
                    [0, 0, 0]];
    shape.fillStyle = '#46CCFC';
    shape.strokeStyle = '#92E1FD';

    return shape;
  }

  static t(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[0, 1, 0], 
                    [1, 1, 1], 
                    [0, 0, 0]];
    shape.fillStyle = '#55B218';
    shape.strokeStyle = '#9EEB82';

    return shape;
  }

  static z(): Shape {
    var shape = new Shape();
    
    shape.matrix = [[1, 1, 0], 
                    [0, 1, 1],
                    [0, 0, 0]];
    shape.fillStyle = '#F19318';
    shape.strokeStyle = '#E9B061';

    return shape;
  }

}