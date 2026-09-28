
const category = document.getElementById("category");
const budgetInput = document.getElementById("budget");
const extraFields = document.getElementById("extraFields");
const planBtn = document.getElementById("planBtn");
const result = document.getElementById("result");

// Show extra fields based on category
category.addEventListener("change", function () {
    extraFields.innerHTML = "";

    if (category.value === "home") {
        extraFields.innerHTML = `
            <label>Room Type:</label>
            <select id="roomType">
                <option>Living Room</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
            </select>
        `;
    } else if (category.value === "party") {
        extraFields.innerHTML = `
            <label>Party Type:</label>
            <select id="partyType">
                <option>Birthday Party</option>
                <option>Wedding</option>
                <option>Family Function</option>
            </select>
        `;
    } else if (category.value === "jewelry") {
        extraFields.innerHTML = `
            <label>Jewelry Type:</label>
            <select id="jewelryType">
                <option>Necklace</option>
                <option>Earrings</option>
                <option>Bangles</option>
                <option>Ring</option>
            </select>
        `;
    }
});

// Budget planning
planBtn.addEventListener("click", function () {
    const selectedCategory = category.value;
    const budget = Number(budgetInput.value);

    if (!selectedCategory) {
        result.innerHTML = "⚠️ Please select a category.";
        return;
    }

    if (!budget || budget <= 0) {
        result.innerHTML = "⚠️ Please enter a valid budget.";
        return;
    }

    let items = [];

    if (selectedCategory === "home") {
        items = [
            ["Furniture", 40],
            ["Lighting", 20],
            ["Decor", 25],
            ["Other Expenses", 15]
        ];
    } else if (selectedCategory === "party") {
        items = [
            ["Food", 40],
            ["Decoration", 25],
            ["Venue", 20],
            ["Other Expenses", 15]
        ];
    } else if (selectedCategory === "jewelry") {
        items = [
            ["Main Jewelry", 70],
            ["Matching Accessories", 20],
            ["Other Expenses", 10]
        ];
    }

    let output = "<h3>📊 Your Budget Plan</h3>";

    items.forEach(function (item) {
        const amount = Math.round(budget * item[1] / 100);

        output += `
            <p><strong>${item[0]}:</strong> ₹${amount.toLocaleString("en-IN")} (${item[1]}%)</p>
        `;
    });

    output += "<p>✅ Budget plan created successfully!</p>";

    result.innerHTML = output;
});
