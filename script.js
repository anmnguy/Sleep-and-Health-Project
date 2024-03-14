

const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("padding", "5px")
    .style("border", "1px solid #ddd")
    .style("border-radius", "5px")
    .style("visibility", "hidden");


function occupation_barChart_Duration(data) {
    const margin = {top: 25, right: 50, bottom: 80, left: 100};
    const width = 500;
    const height = 300;
    
    const svg = d3.select("#Occupation_vs_Duration_barChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const total_avg_sleep_duration = new Map();
    data.forEach(d => {
        if (total_avg_sleep_duration.has(d.Occupation)) {
            const avg_sleep_duration = total_avg_sleep_duration.get(d.Occupation);
            avg_sleep_duration.sum += d.Sleep_Duration;
            avg_sleep_duration.count += 1;
        }
        else {
            total_avg_sleep_duration.set(d.Occupation, {
                sum: d.Sleep_Duration,
                count: 1
            });
        }
    });
    console.log("total avg sleep duration:", total_avg_sleep_duration);
    
    const occupationData = []
    for (const [key, value] of total_avg_sleep_duration.entries()) {
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
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "15px verdana")
        .text("Average Sleep Duration");

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
            .on("mouseover", function(d) {
                // Mouseover event handler
                d3.select(this).style("fill", "lightgreen"); // Change bar color on hover
            })
            .on("mouseout", function() {
                // Mouseout event handler
                d3.select(this).style("fill", d => colorScale(d.averageSleep)); // Restore original bar color
                tooltip.style("visibility", "hidden"); // Hide tooltip
            })
            .transition() // Apply transition
            .duration(1000) // Duration of the animation in milliseconds
            .attr("y", d => yAxis(d.averageSleep)) // Transition the bars to their final y position
            .attr("height", d => height - yAxis(d.averageSleep)); // Transition the bars to their final height
            
}

function occupation_barChart_Quality(data) {
    const margin = {top: 25, right: 50, bottom: 80, left: 100};
    const width = 500;
    const height = 300;
    
    const svg = d3.select("#Occupation_vs_Quality_barChart")
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
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
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
            .on("mouseover", function(d) {
                // Mouseover event handler
                d3.select(this).style("fill", "lightgreen"); // Change bar color on hover
            })
            .on("mouseout", function() {
                // Mouseout event handler
                d3.select(this).style("fill", d => colorScale(d.averageSleep)); // Restore original bar color
                tooltip.style("visibility", "hidden"); // Hide tooltip
            })
            .transition() // Apply transition
            .duration(1000) // Duration of the animation in milliseconds
            .attr("y", d => yAxis(d.averageSleep)) // Transition the bars to their final y position
            .attr("height", d => height - yAxis(d.averageSleep)); // Transition the bars to their final height
            
}

function sleepDisorder_barChart(data) {
    const margin = {top: 25, right: 50, bottom: 80, left: 100};
    const width = 500;
    const height = 300;
    
    const svg = d3.select("#sleep_disorder_barChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const total_avg_sleep_quality = new Map();
    data.forEach(d => {
        if (total_avg_sleep_quality.has(d.Sleep_Disorder)) {
            const avg_sleep_quality = total_avg_sleep_quality.get(d.Sleep_Disorder);
            avg_sleep_quality.sum += d.Quality_of_Sleep;
            avg_sleep_quality.count += 1;
        }
        else {
            total_avg_sleep_quality.set(d.Sleep_Disorder, {
                sum: d.Quality_of_Sleep,
                count: 1
            });
        }
    });
    console.log("total avg sleep quality:", total_avg_sleep_quality);
    
    const sleep_disorder_Data = []
    for (const [key, value] of total_avg_sleep_quality.entries()) {
        sleep_disorder_Data.push({
            sleepDisorder: key,
            averageSleep: value.sum / value.count
        })
    }
    sleep_disorder_Data.sort(function(a,b) {
        return d3.ascending(a.averageSleep, b.averageSleep)
    })
    console.log("sleep disorder data: ", sleep_disorder_Data);
    
    const xAxis = d3.scaleBand()
        .domain(sleep_disorder_Data.map(d => d.sleepDisorder))
        .range([0, width])
        .padding(0.2)
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    const yAxis = d3.scaleLinear()
        .domain([d3.min(sleep_disorder_Data, d => d.averageSleep) - 10, d3.max(sleep_disorder_Data, d => d.averageSleep)])
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
        .text("Sleep Disorder");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "15px verdana")
        .text("Average Sleep Quality");

    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
        .domain([d3.min(sleep_disorder_Data, d => d.averageSleep), d3.max(sleep_disorder_Data, d => d.averageSleep)]);

    svg.selectAll("bar")
        .data(sleep_disorder_Data)
        .join("rect")
            .attr("x", d => xAxis(d.sleepDisorder))
            .attr("y", height) // Start the bars from the bottom of the chart
            .attr("width", xAxis.bandwidth())
            .attr("height", 0) // Start the bars with zero height
            .style("fill", d => colorScale(d.averageSleep))
            .on("mouseover", function(d) {
                // Mouseover event handler
                d3.select(this).style("fill", "lightgreen"); // Change bar color on hover
            })
            .on("mouseout", function() {
                // Mouseout event handler
                d3.select(this).style("fill", d => colorScale(d.averageSleep)); // Restore original bar color
                tooltip.style("visibility", "hidden"); // Hide tooltip
            })
            .transition() // Apply transition
            .duration(1000) // Duration of the animation in milliseconds
            .attr("y", d => yAxis(d.averageSleep)) // Transition the bars to their final y position
            .attr("height", d => height - yAxis(d.averageSleep)); // Transition the bars to their final height
}

function sleepDisorder_boxPlot(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    // Define the color scale
    const colorScale = d3.scaleOrdinal()
        .domain(["Insomnia", "Sleep Apnea", "None"])
        .range(["#a50062", "#d6eeee", "#313695"]);

    const svg = d3.select("#sleep_disorder_boxPlot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const sleepDisorders = ["Insomnia", "Sleep Apnea", "None"]; // Define the order of sleep disorders

    const boxPlotData = sleepDisorders.map(disorder => {
        const disorderData = data.filter(d => d.Sleep_Disorder === disorder);
        const values = disorderData.map(d => d.Quality_of_Sleep).sort(d3.ascending);
        const min = d3.min(values);
        const q1 = d3.quantile(values, 0.25);
        const median = d3.quantile(values, 0.5);
        const q3 = d3.quantile(values, 0.75);
        const max = d3.max(values);
        const iqr = q3 - q1;
        const outliers = values.filter(d => d < q1 - (1.5 * iqr) || d > q3 + (1.5 * iqr));

        return {
            disorder: disorder,
            values: values,
            min: min,
            q1: q1,
            median: median,
            q3: q3,
            max: max,
            outliers: outliers
        };
    });
    console.log("sleep disorders for boxplot: ", boxPlotData);

    const xScale = d3.scaleBand()
        .domain(sleepDisorders)
        .range([0, width])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(boxPlotData, d => d.max)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Draw boxes
    svg.selectAll(".box")
        .data(boxPlotData)
        .join("g")
        .attr("class", "box")
        .attr("transform", d => "translate(" + xScale(d.disorder) + ",0)")
        .call(g => g.selectAll("rect")
            .data(d => [d])
            .join("rect")
            .attr("x", 0)
            .attr("y", d => yScale(d.q3))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d.q1) - yScale(d.q3))
            .attr("stroke", "black")
            .attr("fill", d => colorScale(d.disorder)) 
        );

    // Draw median lines
    svg.selectAll(".median")
        .data(boxPlotData)
        .join("line")
        .attr("class", "median")
        .attr("x1", d => xScale(d.disorder))
        .attr("x2", d => xScale(d.disorder) + xScale.bandwidth())
        .attr("y1", d => yScale(d.median))
        .attr("y2", d => yScale(d.median))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4");

    // Draw whiskers
    svg.selectAll(".whisker")
        .data(boxPlotData)
        .join("line")
        .attr("class", "whisker")
        .attr("x1", d => xScale(d.disorder) + xScale.bandwidth() / 2)
        .attr("x2", d => xScale(d.disorder) + xScale.bandwidth() / 2)
        .attr("y1", d => yScale(d.min))
        .attr("y2", d => yScale(d.max))
        .attr("stroke", "black");

    // X-Label
    svg.append("text")
        .attr("transform",
            "translate(" + width / 2 + "," + (height + margin.bottom - 15) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "15px verdana")
        .text("Sleep Disorder");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "15px verdana")
        .text("Sleep Quality");
    
    // Label median with its value
    svg.selectAll(".median-label")
        .data(boxPlotData)
        .join("text")
        .attr("class", "median-label")
        .attr("x", d => xScale(d.disorder) + xScale.bandwidth() / 2 + 5)
        .attr("y", d => yScale(d.median) - 5) // Position above the median line
        .text(d => d.median.toFixed(2)) // Display median value
        .style("text-anchor", "right")
        .style("font-size", "10px");

}

function physicalActivity_scatterPlot_Duration(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    const svg = d3.select("#physicalActivity_scatterPlot_Duration")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    const scatter = svg.append("g")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.Physical_Activity_Level))
        .attr("cy", d => y(d.Sleep_Duration))
        .style("fill", "red");

    function updateChart() {
        const newX = d3.event.transform.rescaleX(x);
        const newY = d3.event.transform.rescaleY(y);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        scatter.selectAll("circle")
            .attr("cx", d => newX(d.Physical_Activity_Level))
            .attr("cy", d => newY(d.Sleep_Duration));
    }
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 40])
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    svg.call(zoom);

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 5) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Physical Activity Level");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Sleep Duration");
}

function physicalActivity_scatterPlot_Quality(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    const svg = d3.select("#physicalActivity_scatterPlot_Quality")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    const scatter = svg.append("g")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.Physical_Activity_Level))
        .attr("cy", d => y(d.Quality_of_Sleep))
        .style("fill", "blue");

    function updateChart() {
        const newX = d3.event.transform.rescaleX(x);
        const newY = d3.event.transform.rescaleY(y);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        scatter.selectAll("circle")
            .attr("cx", d => newX(d.Physical_Activity_Level))
            .attr("cy", d => newY(d.Quality_of_Sleep));
    }
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 40])
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    svg.call(zoom);

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 5) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Physical Activity Level");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Quality of Sleep");
}

function stress_scatterPlot_Quality(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    const svg = d3.select("#stress_scatterPlot_Quality")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 15])
        .range([0, width]);

    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    const scatter = svg.append("g")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.Stress_Level))
        .attr("cy", d => y(d.Quality_of_Sleep))
        .style("fill", "blue");

    function updateChart() {
        const newX = d3.event.transform.rescaleX(x);
        const newY = d3.event.transform.rescaleY(y);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        scatter.selectAll("circle")
            .attr("cx", d => newX(d.Stress_Level))
            .attr("cy", d => newY(d.Quality_of_Sleep));
    }
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 40])
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    svg.call(zoom);

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 5) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Stress Level");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Quality of Sleep");
}

function stress_scatterPlot_Duration(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    const svg = d3.select("#stress_scatterPlot_Duration")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 15])
        .range([0, width]);

    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    const scatter = svg.append("g")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.Stress_Level))
        .attr("cy", d => y(d.Sleep_Duration))
        .style("fill", "blue");

    function updateChart() {
        const newX = d3.event.transform.rescaleX(x);
        const newY = d3.event.transform.rescaleY(y);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        scatter.selectAll("circle")
            .attr("cx", d => newX(d.Stress_Level))
            .attr("cy", d => newY(d.Sleep_Duration));
    }
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 40])
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    svg.call(zoom);

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 5) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Stress Level");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Duration of Sleep");
}

function heartRate_scatterPlot_Quality(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    const svg = d3.select("#heartRate_scatterPlot_Quality")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 150])
        .range([0, width]);

    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    const scatter = svg.append("g")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.Heart_Rate))
        .attr("cy", d => y(d.Quality_of_Sleep))
        .style("fill", "blue");

    function updateChart() {
        const newX = d3.event.transform.rescaleX(x);
        const newY = d3.event.transform.rescaleY(y);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        scatter.selectAll("circle")
            .attr("cx", d => newX(d.Heart_Rate))
            .attr("cy", d => newY(d.Quality_of_Sleep));
    }
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 40])
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    svg.call(zoom);

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 5) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Heart Rate");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Quality of Sleep");
}

function heartRate_scatterPlot_Duration(data) {
    const margin = { top: 25, right: 50, bottom: 80, left: 100 };
    const width = 500;
    const height = 300;

    const svg = d3.select("#heartRate_scatterPlot_Duration")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 150])
        .range([0, width]);

    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    const scatter = svg.append("g")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.Heart_Rate))
        .attr("cy", d => y(d.Sleep_Duration))
        .style("fill", "blue");

    function updateChart() {
        const newX = d3.event.transform.rescaleX(x);
        const newY = d3.event.transform.rescaleY(y);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        scatter.selectAll("circle")
            .attr("cx", d => newX(d.Heart_Rate))
            .attr("cy", d => newY(d.Sleep_Duration));
    }
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 40])
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    svg.call(zoom);

    // X-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + width / 2 + "," + (height + margin.bottom - 5) + ")"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Heart Rate");

    // Y-Label
    svg.append("text")
        .attr("transform", 
            "translate(" + (-margin.left + 50) + "," + (height / 2 - margin.top) + ")" + // Adjust the translation for vertical centering
            "rotate(-90)"
        )
        .style("text-anchor", "middle")
        .style("font", "16px Arial")
        .text("Quality of Sleep");
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
            Stress_Level: Number(d['Stress Level']),
            Heart_Rate: Number(d['Heart Rate'])
        }
    })
    console.log("filtered: ", filteredData)

    occupation_barChart_Duration(filteredData);
    occupation_barChart_Quality(filteredData);

    physicalActivity_scatterPlot_Duration(filteredData);
    physicalActivity_scatterPlot_Quality(filteredData);

    sleepDisorder_barChart(filteredData);
    sleepDisorder_boxPlot(filteredData);

    stress_scatterPlot_Quality(filteredData);
    stress_scatterPlot_Duration(filteredData);

    heartRate_scatterPlot_Quality(filteredData);
    heartRate_scatterPlot_Duration(filteredData);
    
})
