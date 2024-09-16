let ring;
let bowl;
let one;
let two;
let three;
let four;

F = [];
M = [];
function preload() {
  pond = loadImage("/assets/pond.jpg");
  ring = loadImage("/assets/Over.png");
  bowl = loadImage("/assets/bowl.png"); 
  // one = loadSound('/assets/one.mp3');
  // two = loadSound('/assets/two.mp3');
  // three = loadSound('/assets/three.mp3');
  // four = loadSound('/assets/four.mp3');
}
on = true;
function setup() {
  // one.loop();
  // two.loop();
  // three.loop();
  // four.loop();
  createCanvas(800, 800);
  spawn();
}
function spawn() {

  F.push(
    new fish(
      0,
      280,
      1,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      290,
      2,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      300,
      3,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      310,
      4,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      320,
      5,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      330,
      6,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      340,
      7,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      350,
      8,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      360,
      9,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
  F.push(
    new fish(
      0,
      370,
      10,
      random(99),
      random(99),
      random(99),
      random(99),
      random(99),
      random(99)
    )
  );
}
function draw() {
  if (M.length > 1) {
    F.push(mate(M[0], M[1], 0, 320));
    M[0].mom = false;
    M[1].mom = false;
    M = [];
  }
  translate(400, 400);
  image(pond, -400, -400, 800, 800);
  image(bowl, -150, -150, 300, 300);
  textSize(25);
  //cull
  fill(50, 45, 40);
  circle(0, -300, 32);
  fill(99, 90, 80);
  circle(0, -300, 30);
  fill(200, 200, 250);
  text("☠", -12, -290);

  fill(50, 45, 40);
  circle(0, 300, 32);
  fill(99, 90, 80);
  circle(0, 300, 30);
  fill(200, 200, 250);
  textSize(30);
  text("𓆣", -8, 311);
  fill(200, 210, 165);
  ellipse(0, 140, 32, 27);
  fill(160, 160, 132);
  ellipse(0, 140, 30, 25);
  fill(200, 200, 165);
  textSize(19);
  text("倒", -10, 146);
  textSize(20);
  fill(104, 120, 90);
  text("䷬", -9, 9);
  for (var f of F) f.show();
  image(ring, -400, -400, 800, 800);
  fill(255, 0, 10);
  circle(-380, 380, 30);
  fill(0);
  textSize(25);
  if (on) text("🕬", -395, 385);
  else text("🕫", -398, 385);

}
function mouseClicked() {
  print("Dave");
  for (var f of F) f.over();
  if (dist(mouseX - 400, mouseY - 400, 0, -300) < 30) cull();
  if (dist(mouseX - 400, mouseY - 400, 0, 140) < 30) tip();
  if (dist(mouseX - 400, mouseY - 400, 0, 0) < 30) gather();
  if (dist(mouseX - 400, mouseY - 400, 0, 300) < 30) spawn();
  if (dist(mouseX - 400, mouseY - 400, -380, 380) < 30) 
  {
  on = !on;
    print(on);
  if(on)
    {
      outputVolume(1); 
    }
   else
    outputVolume(0); 
  }
}

function fish(D, W, H, r, g, b, y, B, w) {
  t = 0;
  S = TAU / 990;
  this.D = D;
  this.W = W;
  this.H = H;
  this.r = r;
  this.g = g;
  this.b = b;
  this.y = y;
  this.B = B;
  this.w = w;

  this.erg = this.g; // current erg
  this.C = color(
    this.r + this.y + this.w - this.B,
    this.g + this.y + this.w - this.B,
    this.b + this.w - this.b
  );
  this.show = function () {
    S = TAU / 990;
    t += this.erg / 99;
    if (this.D < TAU) {
      //detect if other fish are close and shove the to the side and back
      for (var f of F) {
        if (abs(f.D - this.D) < S * 10 && abs(f.W - this.W) < 1 && this != f) {
          f.D -= (S * random(this.r)) / 99;
          f.W += random(-this.r, this.r) / 99;
        }
      }

      if (random(200) < this.b) this.erg = random(this.erg, this.g); //second Wind
      this.erg *= 0.9;
      this.W += random(-this.g / 99, this.g / 99);
      this.W = constrain(this.W, 280, 480);

      if (this.erg > 1) this.D += (S * random(this.y + this.erg)) / 50;
      noStroke();
      fill(this.C);
      //body
      circle(sin(this.D) * this.W, cos(this.D) * this.W, 20);
      //tail
      circle(
        sin(this.D - S * (pow(this.W, 0.25) + sin(t / 2))) *
          (this.W + (t % 7) - 3.5),
        cos(this.D - S * (pow(this.W, 0.25) + sin(t / 2))) *
          (this.W + (t % 7) - 3.5),
        15
      );
      triangle(
        sin(this.D - S * (7 + sin(t / 2))) * (this.W + (t % 7) - 3.5),
        cos(this.D - S * (7 + sin(t / 2))) * (this.W + (t % 7) - 3.5),
        sin(this.D - S * 13) * (this.W + 9),
        cos(this.D - S * 13) * (this.W + 9),
        sin(this.D - S * 13) * (this.W - 9),
        cos(this.D - S * 13) * (this.W - 9)
      );
      circle(
        sin(this.D + S * 5) * (this.W + 5),
        cos(this.D + S * 5) * (this.W + 7),
        13
      );
      fill(this.C);
      circle(
        sin(this.D + S * 5) * (this.W - 5),
        cos(this.D + S * 5) * (this.W - 5),
        15
      );
      fill(200, 200, 200 + random(50));
      circle(
        sin(this.D + S * 5) * (this.W - 5),
        cos(this.D + S * 5) * (this.W - 5),
        13
      );
      circle(
        sin(this.D + S * 5) * (this.W + 5),
        cos(this.D + S * 5) * (this.W + 5),
        13
      );
      fill(0);
      circle(
        sin(this.D + S * 5) * (this.W - 5),
        cos(this.D + S * 5) * (this.W - 5),
        3
      );
      circle(
        sin(this.D + S * 5) * (this.W + 5),
        cos(this.D + S * 5) * (this.W + 5),
        3
      );
    } //in the winners circle
    else {
      if (dist(this.H, this.W, 0, 0) > 110) {
        this.H *= 0.9;
        this.W *= 0.9;
        this.D = (this.D + random(TAU * 2, TAU * 3)) / 2;
      } else {
        this.D += random((-TAU / 990) * 5, (TAU / 990) * 5);
        this.H += sin(this.D);
        this.W += cos(this.D);
      }
      //Halo
      fill(200, 200, 200);
      if (this.mom) {
        circle(this.H, this.W, 30);
      }
      //head
      fill(this.C);
      //body
      circle(this.H, this.W, 20);
      //tail
      circle(
        this.H - sin(this.D) * (5 + 5 * sin(t / 10)),
        this.W - cos(this.D) * (5 + 5 * sin(t / 10)),
        15
      );
      TX = this.H - sin(this.D) * (10 + 5 * sin(t / 10));
      TY = this.W - cos(this.D) * (10 + 5 * sin(t / 10));

      triangle(
        TX,
        TY,
        TX + sin(this.D - (PI * 3) / 4) * 15,
        TY + cos(this.D - (PI * 3) / 4) * 15,
        TX + sin(this.D + (PI * 3) / 4) * 15,
        TY + cos(this.D + (PI * 3) / 4) * 15
      );
      //eyes
      circle(
        this.H + sin(this.D + TAU / 15) * 10,
        this.W + cos(this.D + TAU / 15) * 10,
        15
      );
      circle(
        this.H + sin(this.D - TAU / 15) * 10,
        this.W + cos(this.D - TAU / 15) * 10,
        15
      );
      fill(200, 200, 200);
      circle(
        this.H + sin(this.D + TAU / 15) * 10,
        this.W + cos(this.D + TAU / 15) * 10,
        13
      );
      circle(
        this.H + sin(this.D - TAU / 15) * 10,
        this.W + cos(this.D - TAU / 15) * 10,
        13
      );
      fill(0, 0, 0);
      circle(
        this.H + sin(this.D + TAU / 15) * 10,
        this.W + cos(this.D + TAU / 15) * 10,
        3
      );
      circle(
        this.H + sin(this.D - TAU / 15) * 10,
        this.W + cos(this.D - TAU / 15) * 10,
        3
      );
    }
  };
  this.over = function () {
    if (dist(mouseX - 400, mouseY - 400, this.H, this.W) < 30 && this.D > TAU) {
      M.push(this);
      this.mom = true;
    }
  };
}

function mate(A, B, D, W) {
  out = new fish(
    0,
    (A.W + B.W) / 2,
    (A.H + B.H) / 2,
    flip(A.r, B.r) + random(-10, 10),
    flip(A.g, B.g) + random(-10, 10),
    flip(A.b, B.b) + random(-10, 10),
    flip(A.y, B.y) + random(-10, 10),
    flip(A.B, B.B) + random(-10, 10),
    flip(A.w, B.w) + random(-10, 10)
  );
  return out;
}

function flip(A, B) {
  if (random(99) < 50) return A;
  return B;
}
function cull() {
  S = [];
  //kill all the fish that are not in the bowl
  var j = 0;
  for (var i = 0; i < F.length; i++) {
    if (F[i].D > TAU) {
      S.push(F[i]);
    }
  }
  F = S;
}
function gather() {
  for (var f of F) {
    f.D = TAU * 2;
  }
}
function tip() {
  //tip the bowl
  for (var f of F) {
    if (f.D > TAU) {
      f.mom = false;
      f.D = 0;
      f.W = random(280, 380);
      f.H = 0;
    }
  }
}
