const surveyForm = document.getElementById('surveyForm');
const steps = document.querySelectorAll('.step');
const progress = document.getElementById('progress');
let currentStep = 0;

function updateProgress() {
  const percent = (currentStep / (steps.length - 1)) * 100;
  progress.style.width = percent + '%';
}

// Show current step in survey, hide the rest
function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    updateProgress();
}

function nextStep() {
    if(currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if(currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// Button functionality
surveyForm.addEventListener('click', function(e) {
    if(e.target.id === 'nextBtn') {
        nextStep();
    } else if (e.target.id === 'prevBtn') {
            prevStep();
    }
});

// Step 2: Rating Boxes

const ratingBoxes = document.querySelectorAll('.rating-box');
ratingBoxes.forEach(box => {
    box.addEventListener('click', function(){
        // Remove selected class from all rating boxes
        ratingBoxes.forEach(box => box.classList.remove('selected'));
        // Add selected class to clicked box
        box.classList.add('selected');
        // Update hidden input
        document.getElementById('overall-rating').value = box.getAttribute('data-value');
    });
});

// Step 3: Communication
const starElements = document.querySelectorAll('.star');
let communicationRating = 0;

starElements.forEach(star => {
    star.addEventListener('click', function() {
        communicationRating = parseInt(star.getAttribute('data-value'));
        document.getElementById('communicationInput').value = communicationRating;
        updateStars(communicationRating);
    });
});

function updateStars(rating) {
    starElements.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
          star.classList.add('selected');
          // Use a filled star (★) when selected
          star.innerHTML = "&#9733;";
        } else {
          star.classList.remove('selected');
          // Use an outlined star (☆) when not selected
          star.innerHTML = "&#9734;";
        }
    });
}

// Step 4: Submit Form
  let form = document.getElementById("surveyForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.send(data);
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert("Thank you for your feedback!");
        form.reset();
      } else {
        alert("Something went wrong.");
      }
    };
});


