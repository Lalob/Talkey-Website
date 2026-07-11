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
        ".hero-copy, .section-kicker, .intro-title, .proof-content, .values-head, .brands-visual, .operations-copy"
      )
    ) {
      return "left";
    }

    if (
      item.matches(
        ".signal-board, .company-card, .proof-card, .value-item, .brand-card, .operation-step, .contact-panel"
      )
    ) {
      return "pop";
    }

    return "up";
  }

  function revealGroupFor(item) {
    return (
      item.closest(".hero-grid, .intro-copy, .intro-layout, .proof-grid, .values-grid, .brands-content, .brand-cards, .operations-list") ||
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

  const networkCanvas = document.querySelector("[data-network-canvas]");
  if (networkCanvas) initNetworkCanvas(networkCanvas);

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
      const baseCount = width < 700 ? 30 : Math.min(96, Math.max(58, Math.floor(width / 22)));
      const count = reduceMotion ? Math.round(baseCount * 0.64) : baseCount;
      nodes = Array.from({ length: count }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.16 + Math.random() * 0.38;
        return {
          x: area.xMin + Math.random() * (area.xMax - area.xMin),
          y: area.yMin + Math.random() * (area.yMax - area.yMin),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.6 + Math.random() * 2.5,
          phase: index * 0.7 + Math.random() * 4,
          copper: Math.random() > 0.82
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
      const linkDistance = width < 700 ? 104 : 158;
      const pointerDistance = width < 700 ? 132 : 190;

      nodes.forEach((node) => {
        const waveX = Math.sin(renderTime * 0.0008 + node.phase) * 0.08;
        const waveY = Math.cos(renderTime * 0.0007 + node.phase) * 0.08;
        node.x += (node.vx + waveX) * movementScale;
        node.y += (node.vy + waveY) * movementScale;

        if (node.x < area.xMin || node.x > area.xMax) node.vx *= -1;
        if (node.y < area.yMin || node.y > area.yMax) node.vy *= -1;
        node.x = Math.max(area.xMin, Math.min(area.xMax, node.x));
        node.y = Math.max(area.yMin, Math.min(area.yMax, node.y));

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < pointerDistance) {
            const push = (1 - distance / pointerDistance) * (reduceMotion ? 2.6 : 7);
            node.x += (dx / distance) * push * movementScale;
            node.y += (dy / distance) * push * movementScale;
          }
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance < linkDistance) {
            const strength = (1 - distance / linkDistance) * (reduceMotion ? 0.2 : 0.28);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(16, 89, 138, ${strength})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < pointerDistance) {
            const strength = (1 - distance / pointerDistance) * (reduceMotion ? 0.26 : 0.42);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(201, 121, 59, ${strength})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const color = node.copper ? "201, 121, 59" : "16, 89, 138";
        const pulse = Math.sin(renderTime * 0.002 + node.phase) * (reduceMotion ? 0.14 : 0.45);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${reduceMotion ? 0.46 : 0.58})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${reduceMotion ? 0.038 : 0.055})`;
        ctx.fill();
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

  function initCurveCanvas(canvas, stage) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let pointer = { x: 0, y: 0, active: false };
    const routes = [
      {
        color: "16, 89, 138",
        glow: "16, 89, 138",
        speed: 0.00013,
        points: [
          { x: 0.18, y: 0.55 },
          { x: 0.28, y: 0.29 },
          { x: 0.39, y: 0.29 },
          { x: 0.5, y: 0.42 }
        ]
      },
      {
        color: "201, 121, 59",
        glow: "201, 121, 59",
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
