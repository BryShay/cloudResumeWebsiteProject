// Fetching the JSON data
fetch('about.json')
    .then(response => response.json())
    .then(data => {
        const objective = data.objective;
        const location = data.location;

        document.getElementById('objective').textContent = objective;
        document.getElementById('location').textContent = `${location.city}, ${location.state}`;
    });

fetch('education.json')
    .then(response => response.json())
    .then(data => {
        const degrees = data.degrees;
        const educationList = document.getElementById('educationList');

        degrees.forEach(degree => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
        <span class="degree">${degree.degree}</span> in ${degree.major}, 
        <span class="university">${degree.university}</span> (${degree.location}), 
        ${degree.completion_date}`;
            educationList.appendChild(listItem);
        });
    });

fetch('skills.json')
    .then(response => response.json())
    .then(data => {
        const softwareSkills = data.software;
        const programmingSkills = data.programming;

        const softwareSkillsDiv = document.getElementById('softwareSkills');
        const programmingSkillsDiv = document.getElementById('programmingSkills');

        softwareSkills.forEach((skill, index) => {
            const skillItem = document.createElement('span');
            skillItem.textContent = skill;
            softwareSkillsDiv.appendChild(skillItem);

            if (index < softwareSkills.length - 1) {
                const comma = document.createElement('span');
                comma.textContent = ', ';
                softwareSkillsDiv.appendChild(comma);
            }
        });

        programmingSkills.forEach((skill, index) => {
            const skillItem = document.createElement('span');
            skillItem.textContent = skill;
            programmingSkillsDiv.appendChild(skillItem);

            if (index < programmingSkills.length - 1) {
                const comma = document.createElement('span');
                comma.textContent = ', ';
                programmingSkillsDiv.appendChild(comma);
            }
        });
    });

fetch('experience.json')
    .then(response => response.json())
    .then(data => {
        const jobs = data.jobs;
        const experienceList = document.getElementById('experienceList');

        jobs.forEach(job => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
        <strong>${job.title}</strong> - ${job.company} (${job.location})
        <ul>
          ${job.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}
        </ul>
      `;
            experienceList.appendChild(listItem);
        });
    });

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projects = data.projects;
        const projectsList = document.getElementById('projectsList');

        projects.forEach(project => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
        <strong>${project.title}</strong>
        <p>${project.description}</p>
        <ul>
          ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      `;
            projectsList.appendChild(listItem);
        });
    });

fetch('organizations.json')
    .then(response => response.json())
    .then(data => {
        const organizations = data.organizations;
        const organizationsList = document.getElementById('organizationsList');

        organizations.forEach(org => {
            const listItem = document.createElement('li');
            listItem.textContent = `${org.name} (${org.year})`;
            organizationsList.appendChild(listItem);
        });
    });

fetch('contact.json')
    .then(response => response.json())
    .then(data => {
        const email = data.email;
        const phone = data.phone;
        const linkedin = data.linkedin;
        const github = data.github;

        document.getElementById('email').textContent = email;
        document.getElementById('phone').textContent = phone;
        document.getElementById('linkedin').innerHTML = `<a href="${linkedin}" target="_blank">${linkedin}</a>`;
        document.getElementById('github').innerHTML = `<a href="${github}" target="_blank">${github}</a>`;
    });

fetch('intro.json')
    .then(response => response.json())
    .then(data => {
        const introText = data.intro;
        const introContainer = document.getElementById('introText');

        let index = 0;
        const typeInterval = 100; // Adjust typing speed (in milliseconds)
        const typeWriter = setInterval(() => {
            if (index < introText.length) {
                introContainer.textContent += introText.charAt(index);
                index++;
            } else {
                clearInterval(typeWriter);
            }
        }, typeInterval);
    });

/* Scrolling effect script */
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach(section => {
        const position = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the section is within the viewport
        if (position.top < windowHeight && position.bottom >= 0) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});

/* Download Resume Script */

document.addEventListener('DOMContentLoaded', function() {
    // JavaScript code for any interactivity or dynamic behavior on the website
    // Function to trigger the resume download
    function downloadResume() {
      // Replace the URL with the path to your resume file
      //const resumeUrl = ;
    
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'BryonShaynaResume.pdf';
    
      // Append the link to the document body
      document.body.appendChild(link);
    
      // Trigger the download
      link.click();
    
      // Remove the link from the document body
      document.body.removeChild(link);
    }
    
    // Attach an event listener to the download button
    const downloadButton = document.getElementById('download-button');
    downloadButton.addEventListener('click', downloadResume);
  });

  