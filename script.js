// Typing Animation
const typingText = "Nathan Anteneh And This Is My Portfolio";
const typingElement = document.querySelector(".typing");
let index = 0;

function type() {
  if (index < typingText.length) {
    typingElement.textContent += typingText.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}
type();
// Skill Bar Animation on Scroll
const skillBars = document.querySelectorAll('.skill-level');
const skillPercents = document.querySelectorAll('.skill-percent');

function animateSkillBars() {
  skillBars.forEach((bar, index) => {
    const percent = bar.getAttribute('data-percent');
    bar.style.width = `${percent}%`;
    skillPercents[index].textContent = `${percent}%`;
  });
}
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
});
window.addEventListener('scroll', () => {
  const skillsSection = document.querySelector('.skills');
  const sectionTop = skillsSection.offsetTop;
  const sectionHeight = skillsSection.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition > sectionTop + sectionHeight / 2) {
    animateSkillBars();
  }
});
// Particles.js Background
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('Particles.js loaded!');
});
