function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts [i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function(contact, firstName, lastName, phoneNumber) {
  if (contact) {
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.phoneNumber = phoneNumber;
    return true;
  }
  return false;
}

function EmailAddress(workEmail, personalEmail, otherEmail) {
  this.workEmail = workEmail;
  this.personalEmail = personalEmail;
  this.otherEmail = otherEmail;
}

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $("p").not(".email").show();
  if (contact.emailAddress.workEmail) {
    $("p#wEmail").show();
  }
  if (contact.emailAddress.personalEmail) {
    $("p#pEmail").show();
  }
  if (contact.emailAddress.otherEmail) {
    $("p#oEmail").show();
  }
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".work-email-address").html(contact.emailAddress.workEmail);
  $(".personal-email-address").html(contact.emailAddress.personalEmail);
  $(".other-email-address").html(contact.emailAddress.otherEmail);
  $(".physical-address").html(contact.physicalAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    const inputtedPersonalEmailAddress = $("input#new-personal-email-address").val();
    const inputtedOtherEmailAddress = $("input#new-other-email-address").val();
    const inputtedPhysicalAddress = $("input#new-physical-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-work-email-address").val("");
    $("input#new-personal-email-address").val("");
    $("input#new-other-email-address").val("");
    $("input#new-physical-address").val("");

    let newEmail = new EmailAddress(inputtedWorkEmailAddress, inputtedPersonalEmailAddress, inputtedOtherEmailAddress);
    
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newEmail, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})