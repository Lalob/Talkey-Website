(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  function revealMotionFor(item) {
    if (
      item.matches(
        ".hero-copy, .section-kicker, .intro-title, .values-head, .brands-visual, .operations-copy"
      )
    ) {
      return "left";
    }

    if (
      item.matches(
        ".signal-board, .company-card, .value-item, .brand-card, .operation-step, .contact-panel"
      )
    ) {
      return "pop";
    }

    return "up";
  }

  function revealGroupFor(item) {
    return (
      item.closest(".hero-grid, .intro-copy, .intro-layout, .values-grid, .brands-content, .brand-cards, .operations-list") ||
      item.closest("section") ||
      document.body
    );
  }

  const revealGroupCounts = new Map();

  revealItems.forEach((item) => {
    const group = revealGroupFor(item);
    const groupIndex = revealGroupCounts.get(group) || 0;
    revealGroupCounts.set(group, groupIndex + 1);

    item.dataset.revealMotion = revealMotionFor(item);
    item.style.setProperty("--reveal-delay", `${Math.min(groupIndex * 85, 425)}ms`);

    if (reduceMotion) {
      item.classList.add("is-visible");
    } else {
      revealObserver.observe(item);
    }
  });

  function animateCount(el) {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const duration = target > 100 ? 1200 : 850;
    const start = target > 100 ? target - 36 : 0;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (target - start) * eased).toString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

  const cursorYellow = "246, 194, 65";
  const cursorOrange = "201, 121, 59";
  const cursorTomato = "221, 68, 52";
  const heatColorInner = cursorYellow;
  const heatColorMiddle = cursorOrange;
  const heatColorOuter = cursorTomato;
  const particleBlue = "16, 89, 138";
  const particleBlueLight = "159, 216, 255";
  const densityScale = 0.75;
  const colorReachScale = 0.7;
  const coloredNodeThreshold = 0.08;
  const reducedMotionNodeScale = 0.64;
  let siteParticleDensity = 0;

  function displayArea(width, height) {
    return Math.max(width * height, 1);
  }

  function heroReferenceCount(width) {
    return width < 700 ? 92 : Math.min(276, Math.max(164, Math.floor(width / 8)));
  }

  function motionAdjustedCount(count) {
    return reduceMotion ? Math.max(1, Math.round(count * reducedMotionNodeScale)) : count;
  }

  function setSiteParticleDensity(width, height) {
    const targetCount = Math.max(1, Math.round(heroReferenceCount(width) * densityScale));
    siteParticleDensity = targetCount / displayArea(width, height);
    return targetCount;
  }

  function targetCountForArea(width, height) {
    const density = siteParticleDensity || (heroReferenceCount(width) * densityScale) / displayArea(width, height);
    return Math.max(1, Math.round(displayArea(width, height) * density));
  }

  function cursorHeat(distance, maxDistance) {
    if (distance >= maxDistance) {
      return { intensity: 0, color: heatColorInner };
    }

    const intensity = 1 - distance / maxDistance;
    if (distance < maxDistance * 0.34) {
      return { intensity, color: heatColorInner };
    }

    if (distance < maxDistance * 0.67) {
      return { intensity, color: heatColorMiddle };
    }

    return { intensity, color: heatColorOuter };
  }

  function drawPointerEdges(ctx, pointer, nodes, dark = false) {
    if (!pointer.active) return;

    nodes.forEach((node) => {
      const warm = node.cursorWarm || 0;
      if (warm <= coloredNodeThreshold) return;

      ctx.beginPath();
      ctx.moveTo(pointer.x, pointer.y);
      ctx.lineTo(node.x, node.y);
      ctx.strokeStyle = `rgba(${node.cursorColor || heatColorInner}, ${Math.min(dark ? 0.62 : 0.56, warm * (reduceMotion ? 0.34 : 0.5))})`;
      ctx.lineWidth = (dark ? 1.25 : 1.15) + warm * 0.9;
      ctx.stroke();
    });
  }

  function drawParticleNode(ctx, node, color, warm, pulse, dark = false) {
    const baseRadius = Math.max(1.4, node.radius + pulse * 0.18);
    const radius = baseRadius * (1 + warm);
    const alpha = Math.min(0.95, (dark ? 0.72 : 0.78) + warm * 0.18);

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${alpha})`;
    ctx.fill();
  }

  function distributedPoint(index, count, bounds) {
    const areaWidth = Math.max(bounds.xMax - bounds.xMin, 1);
    const areaHeight = Math.max(bounds.yMax - bounds.yMin, 1);
    const columns = Math.max(1, Math.ceil(Math.sqrt(count * (areaWidth / areaHeight))));
    const rows = Math.max(1, Math.ceil(count / columns));
    const column = index % columns;
    const row = Math.floor(index / columns);
    const cellWidth = areaWidth / columns;
    const cellHeight = areaHeight / rows;
    const jitter = 0.54;

    return {
      x: bounds.xMin + (column + 0.5 + (Math.random() - 0.5) * jitter) * cellWidth,
      y: bounds.yMin + (row + 0.5 + (Math.random() - 0.5) * jitter) * cellHeight
    };
  }

  const networkCanvas = document.querySelector("[data-network-canvas]");
  if (networkCanvas) initNetworkCanvas(networkCanvas);

  const sectionParticleCanvases = Array.from(document.querySelectorAll("[data-section-particles]"));
  if (sectionParticleCanvases.length) initSectionParticles(sectionParticleCanvases);

  const curveCanvas = document.querySelector("[data-curve-canvas]");
  const curveStage = document.querySelector("[data-curve-stage]");
  if (curveCanvas && curveStage) initCurveCanvas(curveCanvas, curveStage);

  function initNetworkCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let pointer = { x: 0, y: 0, active: false };
    let lastTime = 0;
    const supportsPointer = "PointerEvent" in window;

    function bounds() {
      return {
        xMin: width * 0.02,
        xMax: width * 0.98,
        yMin: height * 0.06,
        yMax: height * 0.94
      };
    }

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = bounds();
      const targetCount = setSiteParticleDensity(width, height);
      const count = motionAdjustedCount(targetCount);
      nodes = Array.from({ length: count }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = reduceMotion ? 0.18 + Math.random() * 0.28 : 0.42 + Math.random() * 0.82;
        const point = distributedPoint(index, count, area);
        return {
          x: point.x,
          y: point.y,
          homeX: point.x,
          homeY: point.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2.2 + Math.random() * 3.3,
          phase: index * 0.7 + Math.random() * 4,
          cursorWarm: 0,
          cursorColor: heatColorInner
        };
      });
    }

    function draw(time) {
      const elapsed = lastTime ? time - lastTime : 16.67;
      lastTime = time;
      const frameScale = Math.min(2, Math.max(0.25, elapsed / 16.67));
      const movementScale = reduceMotion ? Math.min(frameScale, 0.18) : frameScale;
      const renderTime = reduceMotion ? time * 0.26 : time;
      ctx.clearRect(0, 0, width, height);
      const area = bounds();
      const pointerDistance = width < 700 ? 146 : 210;
      const warmDistance = (width < 700 ? 220 : 320) * colorReachScale;
      const homePull = reduceMotion ? 0.001 : 0.0016;

      nodes.forEach((node) => {
        const waveX = Math.sin(renderTime * 0.0014 + node.phase) * 0.22;
        const waveY = Math.cos(renderTime * 0.0012 + node.phase) * 0.2;
        node.x += (node.vx + waveX) * movementScale;
        node.y += (node.vy + waveY) * movementScale;
        node.x += (node.homeX - node.x) * homePull * movementScale;
        node.y += (node.homeY - node.y) * homePull * movementScale;

        if (node.x < area.xMin || node.x > area.xMax) node.vx *= -1;
        if (node.y < area.yMin || node.y > area.yMax) node.vy *= -1;
        node.x = Math.max(area.xMin, Math.min(area.xMax, node.x));
        node.y = Math.max(area.yMin, Math.min(area.yMax, node.y));

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const heat = cursorHeat(distance, warmDistance);
          node.cursorWarm = heat.intensity;
          node.cursorColor = heat.color;
          if (distance < pointerDistance) {
            const pull = Math.pow(1 - distance / pointerDistance, 1.35) * (reduceMotion ? 0.45 : 1.55);
            node.x -= (dx / distance) * pull * movementScale;
            node.y -= (dy / distance) * pull * movementScale;
          }
        } else {
          node.cursorWarm *= 0.88;
        }
      });

      drawPointerEdges(ctx, pointer, nodes);

      nodes.forEach((node) => {
        const warm = node.cursorWarm || 0;
        const color = warm > 0.08 ? node.cursorColor : particleBlue;
        const pulse = Math.sin(renderTime * 0.0032 + node.phase) * (reduceMotion ? 0.14 : 0.62);
        drawParticleNode(ctx, node, color, warm, pulse);
      });

      requestAnimationFrame(draw);
    }

    function updatePointer(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      pointer = {
        x,
        y,
        active: x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      };
    }

    function resetPointer() {
      pointer.active = false;
    }

    function resetTiming() {
      lastTime = 0;
      if (document.hidden) resetPointer();
    }

    const onPointerMove = (event) => updatePointer(event.clientX, event.clientY);
    const onMouseMove = (event) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    window.addEventListener("resize", resizeCanvas);
    if (supportsPointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", resetTiming);

    resizeCanvas();
    requestAnimationFrame(draw);
  }

  function initSectionParticles(canvases) {
    const pointer = { x: 0, y: 0, active: false };
    const supportsPointer = "PointerEvent" in window;
    const fieldByCanvas = new Map();
    const fields = canvases.map((canvas) => {
      const ctx = canvas.getContext("2d");
      const field = {
        canvas,
        ctx,
        dark: canvas.dataset.particleTheme === "dark",
        width: 0,
        height: 0,
        dpr: 1,
        nodes: [],
        visible: true,
        lastTime: 0
      };
      fieldByCanvas.set(canvas, field);
      return field;
    }).filter((field) => field.ctx);

    if (!fields.length) return;

    function createNodes(field) {
      const count = motionAdjustedCount(targetCountForArea(field.width, field.height));
      const fieldBounds = { xMin: 0, xMax: field.width, yMin: 0, yMax: field.height };
      field.nodes = Array.from({ length: count }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = reduceMotion ? 0.08 + Math.random() * 0.16 : 0.24 + Math.random() * 0.58;
        const point = distributedPoint(index, count, fieldBounds);
        return {
          x: point.x,
          y: point.y,
          homeX: point.x,
          homeY: point.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.8 + Math.random() * 2.6,
          phase: index * 0.9 + Math.random() * 4,
          cursorWarm: 0,
          cursorColor: heatColorInner
        };
      });
    }

    function resizeField(field) {
      field.dpr = Math.min(window.devicePixelRatio || 1, 2);
      field.width = field.canvas.offsetWidth;
      field.height = field.canvas.offsetHeight;
      field.canvas.width = Math.floor(field.width * field.dpr);
      field.canvas.height = Math.floor(field.height * field.dpr);
      field.ctx.setTransform(field.dpr, 0, 0, field.dpr, 0, 0);
      createNodes(field);
    }

    function resizeAll() {
      fields.forEach(resizeField);
    }

    function palette(field) {
      return field.dark ? particleBlueLight : particleBlue;
    }

    function drawField(field, time) {
      const { ctx, width, height } = field;
      if (!field.visible || !width || !height) return;

      const elapsed = field.lastTime ? time - field.lastTime : 16.67;
      field.lastTime = time;
      const frameScale = Math.min(2, Math.max(0.25, elapsed / 16.67));
      const movementScale = reduceMotion ? Math.min(frameScale, 0.12) : frameScale;
      const renderTime = reduceMotion ? time * 0.18 : time;
      const rect = field.canvas.getBoundingClientRect();
      const localPointer = {
        active: pointer.active && pointer.x >= rect.left && pointer.x <= rect.right && pointer.y >= rect.top && pointer.y <= rect.bottom,
        x: pointer.x - rect.left,
        y: pointer.y - rect.top
      };
      const pointerDistance = width < 700 ? 136 : 190;
      const warmDistance = (width < 700 ? 200 : 280) * colorReachScale;
      const homePull = reduceMotion ? 0.0008 : 0.0014;

      ctx.clearRect(0, 0, width, height);

      field.nodes.forEach((node) => {
        const driftX = Math.sin(renderTime * 0.0012 + node.phase) * 0.18;
        const driftY = Math.cos(renderTime * 0.00135 + node.phase) * 0.18;
        node.x += (node.vx + driftX) * movementScale;
        node.y += (node.vy + driftY) * movementScale;
        node.x += (node.homeX - node.x) * homePull * movementScale;
        node.y += (node.homeY - node.y) * homePull * movementScale;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        if (localPointer.active) {
          const dx = node.x - localPointer.x;
          const dy = node.y - localPointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const heat = cursorHeat(distance, warmDistance);
          node.cursorWarm = heat.intensity;
          node.cursorColor = heat.color;
          if (distance < pointerDistance) {
            const pull = Math.pow(1 - distance / pointerDistance, 1.35) * (reduceMotion ? 0.32 : 1.12);
            node.x -= (dx / distance) * pull * movementScale;
            node.y -= (dy / distance) * pull * movementScale;
          }
        } else {
          node.cursorWarm *= 0.88;
        }
      });

      drawPointerEdges(ctx, localPointer, field.nodes, field.dark);

      field.nodes.forEach((node) => {
        const warm = node.cursorWarm || 0;
        const color = warm > 0.08 ? node.cursorColor : palette(field);
        const pulse = Math.sin(renderTime * 0.003 + node.phase) * (reduceMotion ? 0.08 : 0.42);
        drawParticleNode(ctx, node, color, warm, pulse, field.dark);
      });
    }

    function draw(time) {
      fields.forEach((field) => drawField(field, time));
      requestAnimationFrame(draw);
    }

    function updatePointer(clientX, clientY) {
      pointer.x = clientX;
      pointer.y = clientY;
      pointer.active = true;
    }

    function resetPointer() {
      pointer.active = false;
    }

    const onPointerMove = (event) => updatePointer(event.clientX, event.clientY);
    const onMouseMove = (event) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    if ("IntersectionObserver" in window) {
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const field = fieldByCanvas.get(entry.target);
            if (!field) return;
            field.visible = entry.isIntersecting;
            if (field.visible) field.lastTime = 0;
          });
        },
        { rootMargin: "240px 0px" }
      );
      fields.forEach((field) => visibilityObserver.observe(field.canvas));
    }

    window.addEventListener("resize", resizeAll);
    if (supportsPointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) resetPointer();
      fields.forEach((field) => {
        field.lastTime = 0;
      });
    });

    resizeAll();
    requestAnimationFrame(draw);
  }

  function initCurveCanvas(canvas, stage) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let pointer = { x: 0, y: 0, active: false };
    const routes = [
      {
        color: particleBlue,
        glow: particleBlue,
        speed: 0.00013,
        points: [
          { x: 0.18, y: 0.55 },
          { x: 0.28, y: 0.29 },
          { x: 0.39, y: 0.29 },
          { x: 0.5, y: 0.42 }
        ]
      },
      {
        color: particleBlue,
        glow: particleBlue,
        speed: 0.00016,
        points: [
          { x: 0.5, y: 0.42 },
          { x: 0.61, y: 0.29 },
          { x: 0.72, y: 0.29 },
          { x: 0.82, y: 0.55 }
        ]
      }
    ];
    const particles = routes.flatMap((route, routeIndex) =>
      Array.from({ length: 8 }, (_, index) => ({
        route,
        offset: index / 8 + routeIndex * 0.07,
        radius: 2 + ((index + routeIndex) % 3) * 0.65
      }))
    );

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(point, time, index) {
      let x = point.x * width;
      let y = point.y * height + Math.sin(time * 0.001 + index * 1.7) * 6;
      if (pointer.active && index > 0 && index < 3) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < 220) {
          const pull = (1 - distance / 220) * 30;
          x += ((pointer.x - x) / distance) * pull;
          y += ((pointer.y - y) / distance) * pull;
        }
      }
      return { x, y };
    }

    function curvePoints(route, time) {
      return route.points.map((point, index) => project(point, time, index));
    }

    function bezier(points, t) {
      const [p0, p1, p2, p3] = points;
      const inv = 1 - t;
      return {
        x:
          inv * inv * inv * p0.x +
          3 * inv * inv * t * p1.x +
          3 * inv * t * t * p2.x +
          t * t * t * p3.x,
        y:
          inv * inv * inv * p0.y +
          3 * inv * inv * t * p1.y +
          3 * inv * t * t * p2.y +
          t * t * t * p3.y
      };
    }

    function drawRoute(points, route, alpha, widthScale) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
      ctx.strokeStyle = `rgba(${route.color}, ${alpha})`;
      ctx.lineWidth = widthScale;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    function draw(time) {
      const renderTime = reduceMotion ? time * 0.2 : time;
      ctx.clearRect(0, 0, width, height);
      const pointCache = new Map();

      routes.forEach((route, index) => {
        const points = curvePoints(route, renderTime + index * 300);
        pointCache.set(route, points);
        drawRoute(points, route, reduceMotion ? 0.09 : 0.12, 12);
        drawRoute(points, route, reduceMotion ? 0.18 : 0.24, 3.2);
      });

      particles.forEach((particle, index) => {
        const route = particle.route;
        const points = pointCache.get(route);
        const t = (renderTime * route.speed + particle.offset) % 1;
        const point = bezier(points, t);
        const pointerDistance = pointer.active ? Math.hypot(point.x - pointer.x, point.y - pointer.y) : Infinity;
        const glow = pointerDistance < 120 ? 1 - pointerDistance / 120 : 0;
        const pulse = Math.sin(renderTime * 0.004 + index) * (reduceMotion ? 0.14 : 0.4);
        const radius = particle.radius + pulse + glow * (reduceMotion ? 1.1 : 2.4);

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 4.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${route.glow}, ${0.05 + glow * (reduceMotion ? 0.045 : 0.08)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${route.glow}, ${0.58 + glow * (reduceMotion ? 0.14 : 0.26)})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    function updatePointer(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true
      };
    }

    function resetPointer() {
      pointer.active = false;
    }

    const supportsPointer = "PointerEvent" in window;
    const onPointerMove = (event) => updatePointer(event.clientX, event.clientY);
    const onMouseMove = (event) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    if (supportsPointer) {
      stage.addEventListener("pointermove", onPointerMove, { passive: true });
    } else {
      stage.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    stage.addEventListener("touchmove", onTouchMove, { passive: true });
    stage.addEventListener("pointerleave", resetPointer);
    stage.addEventListener("mouseleave", resetPointer);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    requestAnimationFrame(draw);
  }
})();
