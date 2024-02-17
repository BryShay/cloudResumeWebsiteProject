// GitHub Contribution Chart script below
// Fetch the contribution data
const username = 'BryShay'; // Replace with your GitHub username
const apiUrl = 'https://api.github.com/graphql';

const query = `
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const accessToken = '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'; // Replace with your personal access token

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Authorization': `Token ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(response => response.json())
  .then(result => {
    const contributions = result.data.user.contributionsCollection.contributionCalendar.weeks;
    const flattenedContributions = flattenContributions(contributions);
    const slicedContributions = flattenedContributions.slice(-84); // Get the last 84 days
    const rearrangedContributions = rearrangeContributions(slicedContributions);
    displayContributions(rearrangedContributions);
  })
  .catch(error => {
    console.error('Error fetching contribution data:', error);
  });

// Flatten the contributions into a single array
function flattenContributions(weeks) {
  return weeks.flatMap(week => week.contributionDays);
}

// Rearrange the contributions to display days from top to bottom and weeks from left to right
function rearrangeContributions(contributions) {
  const rearranged = [];
  for (let i = 0; i < 7; i++) {
    rearranged.push([]);
  }

  contributions.forEach((day, index) => {
    const row = index % 7;
    const col = Math.floor(index / 7);
    rearranged[row][col] = day;
  });

  return rearranged;
}

// Display the contribution data on the webpage as a custom heatmap
function displayContributions(contributions) {
    const container = document.getElementById('contributions-chart');
    container.innerHTML = '';
  
    contributions.forEach(row => {
      row.forEach(day => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = getCellColor(day.contributionCount);
  
        // Set the contribution count as a data attribute
        cell.setAttribute('data-count', day.contributionCount);
  
        // Set the date as a data attribute
        cell.setAttribute('data-date', day.date);
  
        // Add a hover event listener
        cell.addEventListener('mouseover', showContributionsCount);
        cell.addEventListener('mouseout', hideContributionsCount);
  
        container.appendChild(cell);
      });
    });
  }
  

// Get the background color for a cell based on the contribution count
function getCellColor(count) {
  if (count >= 15) {
    return '#034219';
  } else if (count >= 10) {
    return '#0d7833';
  } else if (count >= 5) {
    return '#44db79';
  } else if (count >= 1) {
    return '#cffade';
  } else {
    return '#dcdedc';
  }
}

// Show the contribution count on hover
function showContributionsCount(event) {
  const cell = event.target;
  const count = cell.getAttribute('data-count');
  const date = new Date(cell.getAttribute('data-date'));

  // Adjust the date based on the timezone offset
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + timezoneOffset);

  // Format the date and day of the week
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = adjustedDate.toLocaleDateString('en-US', options);

  // Create a tooltip element
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.innerText = `${count} contribution${count !== '1' ? 's' : ''} on ${formattedDate}`;

  // Append the tooltip to the cell
  cell.appendChild(tooltip);
}

// Hide the contribution count on hover out
function hideContributionsCount(event) {
  const cell = event.target;

  // Remove the tooltip element
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}