$(function () {
  // Display the current date and time in the header
  var currentDate = dayjs().format("dddd, MMMM D h:mm A");
  $("#currentDay").text(currentDate);

  // Get the current hour in 24-hour format
  var currentHour = dayjs().hour();

  // Function to generate the time blocks from 9am to 5pm
  function generateTimeBlocks() {
    var planner = $("#planner");

    // Clear existing time blocks
    planner.empty();

    // Loop through each hour from 9am to 5pm
    for (var hour = 9; hour <= 17; hour++) {
      // Create a new time block element
      var timeBlock = $("<div>").addClass("row time-block");
      var hourBlock = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(dayjs().hour(hour).format("ha"));

      var description = $("<textarea>").addClass("col-8 col-md-10 description");
      var saveButton = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      // Set the ID for the time block based on the hour
      timeBlock.attr("id", "hour-" + hour);

      // Append the elements to the time block
      timeBlock.append(hourBlock, description, saveButton);

      // Append the time block to the planner
      planner.append(timeBlock);
    }

    // Apply time block classes
    applyTimeBlockClasses();
  }

  // Function to apply the past, present, or future class to each time block
  function applyTimeBlockClasses() {
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var eventId = $(this).attr("id");
      var eventText = localStorage.getItem(eventId);

      if (eventText) {
        $(this).find("textarea").val(eventText);
      }
    });
  }

  // Save event to local storage
  function saveEvent(eventId, eventText) {
    localStorage.setItem(eventId, eventText);
    showSaveMessage();
  }

  // Show save message
  function showSaveMessage() {
    var saveMessage = $("<p>").addClass("save-message").text("Save completed");
    $("body").append(saveMessage);
    setTimeout(function () {
      $(".save-message").remove();
    }, 2000);
  }

  // Event listener for save button clicks using event delegation
  $(document).on("click", ".saveBtn", function () {
    var eventId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings("textarea").val();

    saveEvent(eventId, eventText);
  });

  // Generate the time blocks on page load
  generateTimeBlocks();

  // Load saved events on page load
  loadEvents();
});








