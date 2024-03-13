


// Occupation - bar chart

// Physical Activity - scatter plot
 
// Cardiovascular Health - ?? 

// Sleep Disorder - box plot or bar chart?

// Stress - bar chart 
// Create a tooltip element
const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("background-color", "black")
    .style("padding", "5px")
    .style("border", "1px solid #ddd")
    .style("border-radius", "5px")
    .style("visibility", "hidden");


function occupation_barChart(data) {
    const margin = {top: 25, right: 50, bottom: 80, left: 100};
    const width = 220;
    const height = 220;
    
    const svg = d3.select("#barChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const total_avg_sleep_quality = new Map();
    data.forEach(d => {
        if (total_avg_sleep_quality.has(d.Occupation)) {
            const avg_sleep_quality = total_avg_sleep_quality.get(d.Occupation);
            avg_sleep_quality.sum += d.Quality_of_Sleep;
            avg_sleep_quality.count += 1;
        }
        else {
            total_avg_sleep_quality.set(d.Occupation, {
                sum: d.Quality_of_Sleep,
                count: 1
            });
        }
    });
    console.log("total avg sleep quality:", total_avg_sleep_quality);
    
    const occupationData = []
    for (const [key, value] of total_avg_sleep_quality.entries()) {
        occupationData.push({
            occupation: key,
            averageSleep: value.sum / value.count
        })
    }
    occupationData.sort(function(a,b) {
        return d3.ascending(a.averageSleep, b.averageSleep)
    })
    console.log("occupation data: ", occupationData);
    
    const xAxis = d3.scaleBand()
        .domain(occupationData.map(d => d.occupation))
        .range([0, width])
        .padding(0.2)
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    const yAxis = d3.scaleLinear()
        .domain([d3.min(occupationData, d => d.averageSleep) - 10, d3.max(occupationData, d => d.averageSleep)])
        .range([height, 0])
    svg.append("g")
        .call(d3.axisLeft(yAxis));

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 15) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "15px verdana")
        .text("Occupation");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + width / 2 + ")" +
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "15px verdana")
        .text("Average Sleep Quality");

    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
        .domain([d3.min(occupationData, d => d.averageSleep), d3.max(occupationData, d => d.averageSleep)]);

    svg.selectAll("bar")
        .data(occupationData)
        .join("rect")
            .attr("x", d => xAxis(d.occupation))
            .attr("y", height) // Start the bars from the bottom of the chart
            .attr("width", xAxis.bandwidth())
            .attr("height", 0) // Start the bars with zero height
            .style("fill", d => colorScale(d.averageSleep))
            .transition() // Apply transition
            .duration(1000) // Duration of the animation in milliseconds
            .attr("y", d => yAxis(d.averageSleep)) // Transition the bars to their final y position
            .attr("height", d => height - yAxis(d.averageSleep)); // Transition the bars to their final height
            
}


d3.csv("Sleep_health_and_lifestyle_dataset.csv").then(rawdata => {
    console.log("rawdata: ", rawdata);
    filteredData = rawdata.map(d => {
        return {
            Sleep_Duration: Number(d['Sleep Duration']), 
            Quality_of_Sleep: Number(d['Quality of Sleep']), 
            Occupation: d.Occupation, 
            Physical_Activity_Level: Number(d['Physical Activity Level']),
            Daily_Steps: Number(d['Daily Steps']),
            Sleep_Disorder: d['Sleep Disorder'],
            Stress_Level: Number(d['Stress Level'])
        }
    })
    console.log("filtered: ", filteredData)

    occupation_barChart(filteredData);
})
