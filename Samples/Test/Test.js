// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
    console.log('Extension script started');

    $(document).ready(function () {
        console.log('Document ready');

        tableau.extensions.initializeAsync().then(function () {
            console.log('Tableau extension initialized');

            const dashboard = tableau.extensions.dashboardContent.dashboard;
            console.log('Dashboard object:', dashboard);

            const sheetsTable = $('#sheetsTable > tbody')[0];
            console.log('Sheets table:', sheetsTable);

            dashboard.worksheets.forEach(function (sheet) {
                console.log('Processing sheet:', sheet.name);
                const newRow = sheetsTable.insertRow(sheetsTable.rows.length);
                const nameCell = newRow.insertCell(0);
                nameCell.innerHTML = sheet.name;
            });

            // This just modifies the UI by removing the loading banner and showing the sheets table.
            $('#loading').addClass('hidden');
            $('#sheetsTable').removeClass('hidden').addClass('show');
        }, function (err) {
            // Something went wrong in initialization.
            console.log('Error while Initializing: ' + err.toString());
        });
    });
})();
