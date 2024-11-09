function calculateGPA() {
  const averagePoints = document.querySelectorAll(".grade-point");
  let totalGradePoints = 0;
  let allGradesAssigned = true;

  averagePoints.forEach((cell) => {
    const gradePoint = parseFloat(cell.textContent);
    if (isNaN(gradePoint)) {
      allGradesAssigned = false;
    } else {
      totalGradePoints += gradePoint;
    }
  });

  let gpa = (totalGradePoints / 4).toFixed(2);

  if (allGradesAssigned) {
    document.getElementById("final_gpa").textContent = gpa;
    document.getElementById("final_grade").textContent = getFinalGrade(gpa);
  } else {
    document.getElementById("final_grade").textContent = "";
    document.getElementById("final_grade").textContent = "";
  }
}

function getFinalGrade(gradePoint) {
  if (gradePoint >= 3.6) return "A+";
  else if (gradePoint >= 3.2) return "A";
  else if (gradePoint >= 2.8) return "B+";
  else if (gradePoint >= 2.4) return "B";
  else if (gradePoint >= 2.0) return "C+";
  else if (gradePoint >= 1.6) return "C";
  else if (gradePoint >= 1.2) return "D+";
  else if (gradePoint >= 0.8) return "D";
  else return "NG";
}

function calculateAverage(input) {
  const parentRow = input.closest("tr");

  const theoryPoint = parentRow.querySelector(".theory > input");
  const theoryGrade = parseFloat(theoryPoint.value) || 0;

  const practicalPoint = parentRow.querySelector(".practical > input");
  const practicalGrade = parseFloat(practicalPoint.value) || 0;

  const gradePoint = (theoryGrade + practicalGrade) / 2;
  parentRow.querySelector(".grade-point").textContent = gradePoint.toFixed(2);

  const finalGrade = parentRow.querySelector(".final-grade");
  finalGrade.textContent = getFinalGrade(gradePoint);

  calculateGPA();
}

function populateTableWithRandomGPA() {
  const theoryPoints = document.querySelectorAll(".theory > input");
  const practicalPoints = document.querySelectorAll(".practical > input");

  for (let i = 0; i < theoryPoints.length; i++) {
    theoryPoints[i].value = getRandomGPA();
    practicalPoints[i].value = getRandomGPA();
    calculateAverage(theoryPoints[i]);
  }
}

function getRandomGPA() {
  return (Math.random() * 3.99 + 0.01).toFixed(2);
}
