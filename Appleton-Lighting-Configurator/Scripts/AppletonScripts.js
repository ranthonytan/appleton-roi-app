var applicationurl = "..";
$(document).ready(function () {
    $("#header").hide();
    insertCookieCode();
    $("#appletonContainer").hide();
    $("#appletonContainer").load(applicationurl + "/HTML/AppletonRootContiner.html", function () {
        BindContainerHTML();
        window.onresize = doALoadOfStuff;
        $("#appletonContainer").show();
        $("#loader").hide();



        $(".btnNextHome").click(function () {

            if ($(".timeperiod").val() != "" && $(".timeperiod").val() != null && $(".energyRate").val() != "" && $(".energyRate").val() != null) {
                if ($(".updateInfo").css("display") == "none") {
                    if ($(".chkbxAgree").prop("checked")) {
                        if ($(".chkbxAllow").prop("checked")) {
                            if (!validateEmail($(".email").val())) {
                                // bootbox.alert("Please enter a valid email address to contact with you");
                                $(".email").focus();
                                $(".email").css("border-color", "red");
                                $(".emailWarning").show();
                                return false;
                            }
                            else {
                                // PushCustomerInfoToELQ();
                                $(".email").css("border-color", "");
                                $(".emailWarning").hide();
                            }

                        }


                        $(".updateInfo").hide();
                        setUserDetails();
                        $(".yeartotalcostspan").text($(".timeperiod").val());
                        $(".timeperiod").eq(1).val($(".timeperiod").eq(0).val());
                        $(".timeperiod").val($(".timeperiod").eq(0).val());
                        $(".energycost").val($(".energyRate").val());
                        var userString = $.cookie("User");
                        if (userString != null) {
                            var currencyValue = $('.ddlcurrency').val();
                            currencyValue = currencyValue.split("-")[1];
                            $(".currency").text(currencyValue);
                        } else {
                            $(".currency").text("$");
                        }
                        $(".tablinks").eq(0).click();
                        $(".timeperiod").eq(1).val($(".timeperiod").eq(0).val());
                        $(".energycost").eq(0).val($(".energyRate").eq(0).val());
                        $(".energycost").val($(".energyRate").eq(0).val());
                        //updateTabData();
                        $(".rootbutton").addClass("active");
                        $(".btnNextHomeValid").click();
                    }
                    else {
                        bootbox.alert("To proceed please agree to Emerson's Privacy Notice. ")
                    }

                }
                else {
                    bootbox.confirm({
                        message: "Are you sure you want to continue without applying the update?",
                        buttons: {
                            cancel: {
                                label: '<i class="fa fa-times"></i> No'
                            },
                            confirm: {
                                label: '<i class="fa fa-check"></i> Yes'
                            }
                        },
                        callback: function (result) {
                            if (result) {
                                $(".tablinks").eq(0).click();
                                $(".rootbutton").addClass("active");
                                $(".btnNextHomeValid").click();
                            }
                        }
                    });
                }

            } else {

                for (var i = $(".requiredHome").length - 1; i >= 0; i--) {
                    if ($(".requiredHome").eq(i).val().length == 0) {
                        $(".requiredHome").eq(i).focus();
                        $(".requiredHome").eq(i).css("border-color", "red");
                        $(".warningInfoHome").eq(i).show();
                    }
                }
            }

        });
    });




});

function updateTabData() {
    var dialog = bootbox.dialog({
        message: '<p class="text-center">Please wait while we update the fixtures...</p>',
        closeButton: false
    });
    $(".updateInfo").hide();
    setTimeout(function () {
        $(".tablinks").eq(0).click();
        $(".energycost").eq(0).val($(".energyRate").eq(0).val());
        $(".energycost").val($(".energyRate").eq(0).val());
        $(".timeperiod").eq(1).val($(".timeperiod").eq(0).val());
        $(".timeperiod").val($(".timeperiod").eq(0).val());
        $(".btnNext1").click();
        $(".btnNext2").click();
        $(".btnNext3").click();
        // $(".btnNext4").click();
        $(".btnNext1").click();
        $(".tablinks").eq(1).click();
        $(".btnNext1").click();
        $(".btnNext2").click();
        $(".btnNext3").click();
        //$(".btnNext4").click();
        $(".btnNext1").click();
        $(".tablinks").eq(2).click();
        $(".btnNext1").click();
        $(".btnNext2").click();
        $(".btnNext3").click();
        // $(".btnNext4").click();
        $(".btnNext1").click();
        $(".tablinks").eq(0).click();
        $(".btnNext1").click();

        dialog.modal('hide');
    }, 2000);



}

function validateData() {
    showUpdateButton();
    $(".requiredHome").css("border-color", "");
    $(".warningInfoHome").hide();
}

function BindContainerHTML() {
    $("#appletonContainerHome").load(applicationurl + "/HTML/AppletonHome.html", function () {
        var sliderEl = $('.slider-wrapper');
        if (sliderEl.size() >= 1) {
            var offset = 0;
            sliderEl.find('.slide').each(function () {
                $(this).data("offset", offset);
                $(this).css({
                    "width": $('.slider-inner').width() + "px"
                });
                offset += $(this).outerWidth(true);
            });
            $('.slider-inner').css({
                "width": offset + 'px'
            });
            $('.slide-show').on("click", function () {
                var target = $(this).data("slide");
                var offset = $('.slide.' + target).data('offset');
                $('.slider-inner').animate({
                    left: '-' + offset + 'px'
                });
                //alert(offset + ' ' + $('.slide.'+target).width());
            });

            $(".chkbxAllow").change(
                function () {
                    if (!$(this).prop("checked")) {
                        //if (!validateEmail($(".email").val())) {
                        $(".chkbxAllow2").prop("checked", false)
                        $(".email").css("border-color", "");
                        $(".emailWarning").hide();
                        //}

                    }
                    else {
                        $(".chkbxAllow2").prop("checked", true)
                    }
                })



            //On apllication change

            $(".application").change(
                function () {
                    if (this.value == "Other") {
                        $(".applicationValue").show();
                    }
                    else {
                        $(".applicationValue").hide();
                        $(".applicationValue").val("");
                    }
                });

            $("#existingConfigurationContainer").load(applicationurl + "/HTML/NextPage.html", function () {
                $(".rootbutton").addClass("active");

                //Lamp change event
                var lamp = $(".lamp").eq(0).val();
                if (lamp == "High Pressure Sodium" || lamp == "Metal Halide" || lamp == "Pulse Start Metal Halide" || lamp == "*Mercury Vapor") {
                    $(".ballast").eq(0).val("1.2");
                } else {
                    $(".ballast").eq(0).val("1");
                }

                var countryNames = new Array();
                var countryIds = new Object();
                $.get("https://restcountries.eu/rest/v2/all", function (dataResult) {
                    $.each(dataResult, function (i, value) {
                        countryNames.push(value.name);
                        countryIds[value.name] = value.cioc;
                    });
                    $('.country').typeahead({ source: countryNames });
                });

                $.get(applicationurl + "/Data/AppletonLigthData.txt", function (dataResult) {
                    var data = JSON.parse(dataResult);
                    //Bind Currency
                    $('.ddlcurrency').find('option').remove();
                    $.each(data.Currency, function (i, value) {
                        $('.ddlcurrency').append($('<option>').text(value.ISOCode).attr('value', value.ISOCode + "-" + value.Symbol));
                    });
                    $('.ddlcurrency').val("USD ($)-$")
                    getUserDetails();

                    /* $(".lamp").change(function() {
                         var lamp = $(".lamp").eq(0).val();
                         //Updated code starts
                     	
                     	
                     	
                         //Updated code ends
                         
                         if (lamp == "High Pressure Sodium" || lamp == "Metal Halide" || lamp == "Pulse Start Metal Halide" || lamp == "*Mercury Vapor") {
                             $(".ballast").eq(0).val("1.2");
                         } else {
                             $(".ballast").eq(0).val("1");
                         }
 
                         var watt = $(".watt").eq(0).val() == "" ? 0 : parseFloat($(".watt").eq(0).val());
                         var ballast = $(".ballast").eq(0).val() == "" ? 0 : parseFloat($(".ballast").eq(0).val());
                         var systemWatt = watt * ballast;
                         if (systemWatt > 0) {
                             $(".systemwatt").eq(0).val(Math.round(systemWatt ));
                         }
 
                         //Bind life
                         var lampValue = $.grep(data.ExistingLampLife, function(n, i) {
                             if ($('.lamp').eq(0).find(":selected").text() == n.LampType) {
                                 return n.LampLife;
                             }
                         });
 
                         if (lampValue != null && lampValue.length > 0) {
                             $(".life").eq(0).val(lampValue[0].LampLife);
                         }
 
 
                         calculateExistingSummary();
 
                     });*/
                });
                //Updated code starts
				/*$.get(applicationurl+"/Data/LampData.txt", function(dataResult) {
					var data = JSON.parse(dataResult);		
					
					
					$(".lamp").eq(0).change(function() {
						var lamp = $(".lamp").eq(0).val();
						
						if(data!=null)
						{
							if(data.Lamp.length>0)
							{
								var lampValue = $.grep(data.Lamp, function(n, i) {
									if ($('.lamp').eq(0).find(":selected").text() == n.Name) {
										return n;
									}
								});
								$(".ballast").eq(0).val(lampValue[0].BCF);
								$('.watt').eq(0).find('option').remove();
								$.each(lampValue[0].Wattage, function(i, value) {
                                        $('.watt').eq(0).append($('<option>').text(value).attr('value', value));
                                    });
									
									$(".life").eq(0).val(lampValue[0].life);
							}
						}					
						
						
                        

                        var watt = $(".watt").eq(0).val() == "" ? 0 : parseFloat($(".watt").eq(0).val());
                        var ballast = $(".ballast").eq(0).val() == "" ? 0 : parseFloat($(".ballast").eq(0).val());
                        var systemWatt = watt * ballast;
                        if (systemWatt > 0) {
                            $(".systemwatt").eq(0).val(Math.round(systemWatt ));
                        }
                        calculateExistingSummary();

                    });
					
					
					
				});
				
				$(".watt").eq(0).change(function() {
						var watt = $(".watt").eq(0).val() == "" ? 0 : parseFloat($(".watt").eq(0).val());
						if(watt!="Others")
						{
							$(".wattValue").hide();
							var ballast = $(".ballast").eq(0).val() == "" ? 0 : parseFloat($(".ballast").eq(0).val());
							var systemWatt = watt * ballast;
							if (systemWatt > 0) {
								$(".systemwatt").eq(0).val(Math.round(systemWatt ));
							}
							calculateExistingSummary();
						}
						else
						{
							$(".wattValue").show();
						}
                        
					});
					*/
                //Updated code ends

                $(".btnNextHome").click(function () {
                    setUserDetails();
                });
                //Button event 
                $(".btnNext1").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").addClass("active");
                        $(".btnNext2").removeClass("active");
                        $(".btnNext3").removeClass("active");
                        $(".btnNext4").removeClass("active");

                        if ($.cookie("ficture") != "ficture1") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture1");
                            ////$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }

                });

                $(".btnNext2").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").removeClass("active");
                        $(".btnNext2").addClass("active");
                        $(".btnNext3").removeClass("active");
                        $(".btnNext4").removeClass("active");

                        if ($.cookie("ficture") != "ficture2") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture2");
                            //$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }
                });

                $(".btnNext3").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").removeClass("active");
                        $(".btnNext2").removeClass("active");
                        $(".btnNext3").addClass("active");
                        $(".btnNext4").removeClass("active");

                        if ($.cookie("ficture") != "ficture3") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture3");
                            //$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }
                });
                $(".btnNext4").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").removeClass("active");
                        $(".btnNext2").removeClass("active");
                        $(".btnNext3").removeClass("active");
                        $(".btnNext4").addClass("active");

                        if ($.cookie("ficture") != "ficture4") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture4");
                            //$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }
                });
            });
            $("#appletonReport").load(applicationurl + "/HTML/Report.html", function () {
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover({
                        html: true,
                        container: 'body',
                        placement: 'right',
                        trigger: 'hover',
                        width: '800px'
                    });
                });

                $(".chkbxAllow2").change(
                    function () {
                        if (!$(this).prop("checked")) {
                            //if (!validateEmail($(".email").val())) {
                            $(".chkbxAllow").prop("checked", false)
                            //}

                        }
                        else {
                            $(".chkbxAllow").prop("checked", true)
                        }
                    })

                $(".btnEmail").on("click", function () {

                    //$.get(applicationurl+"/HTML/ReportEmail.html", function(dataResult) {
                    //    var configuration = $.cookie("configuration");
                    //    var fixtureValueString = $.cookie("fixtureValueexisting");
                    //    var fixtureValueObjectExisting = JSON.parse(fixtureValueString);
                    //    fixtureValueString = $.cookie("fixtureValueappleton");
                    //    var fixtureValueObjectAppleton = JSON.parse(fixtureValueString);
                    //    fixtureValueString = $.cookie("fixtureValueproposal");
                    //    var fixtureValueObjectProposal = JSON.parse(fixtureValueString);

                    //    if (fixtureValueObjectExisting != null) {
                    //        if (fixtureValueObjectExisting.totalInitialNetInvestment != null) {
                    //            dataResult = dataResult.replace("existingNetInvestment", Math.round(fixtureValueObjectExisting.totalInitialNetInvestment ));
                    //            dataResult = dataResult.replace("existingFixtureMaintenance", Math.round(fixtureValueObjectExisting.totalFixtureMaintenance ));
                    //            dataResult = dataResult.replace("existingEnergyConsumed", Math.round(fixtureValueObjectExisting.totalEnergyConsumed ));
                    //            dataResult = dataResult.replace("existingOtherCost", Math.round(fixtureValueObjectExisting.totalOtherCost ));
                    //            dataResult = dataResult.replace("existingTotalFixyureSummaryCost", Math.round(fixtureValueObjectExisting.totalExistingFixtureCost ));
                    //            dataResult = dataResult.replace("existingNetInvestmentPercentage", Math.round(fixtureValueObjectExisting.totalInitialNetInvestmentPercentage ) + "%");
                    //            dataResult = dataResult.replace("existingFixtureMaintenancePercentage", Math.round(fixtureValueObjectExisting.totalFixtureMaintenancePercentage ) + "%");
                    //            dataResult = dataResult.replace("existingEnergyConsumedPercentage", Math.round(fixtureValueObjectExisting.totalEnergyConsumedPercentage ) + "%");
                    //            dataResult = dataResult.replace("existingOtherCostPercentage", Math.round(fixtureValueObjectExisting.totalOtherCostPercentage ) + "%");
                    //        }
                    //    }

                    //    if (fixtureValueObjectAppleton != null) {
                    //        if (fixtureValueObjectAppleton.totalInitialNetInvestment != null) {
                    //            dataResult = dataResult.replace("appletonNetInvestment", Math.round(fixtureValueObjectAppleton.totalInitialNetInvestment ));
                    //            dataResult = dataResult.replace("appletonFixtureMaintenance", Math.round(fixtureValueObjectAppleton.totalFixtureMaintenance ));
                    //            dataResult = dataResult.replace("appletonEnergyConsumed", Math.round(fixtureValueObjectAppleton.totalEnergyConsumed ));
                    //            dataResult = dataResult.replace("appletonOtherCost", Math.round(fixtureValueObjectAppleton.totalOtherCost ));
                    //            dataResult = dataResult.replace("appletonTotalFixyureSummaryCost", Math.round(fixtureValueObjectAppleton.totalExistingFixtureCost ));
                    //            dataResult = dataResult.replace("appletonNetInvestmentPercentage", Math.round(fixtureValueObjectAppleton.totalInitialNetInvestmentPercentage ) + "%");
                    //            dataResult = dataResult.replace("appletonFixtureMaintenancePercentage", Math.round(fixtureValueObjectAppleton.totalFixtureMaintenancePercentage ) + "%");
                    //            dataResult = dataResult.replace("appletonEnergyConsumedPercentage", Math.round(fixtureValueObjectAppleton.totalEnergyConsumedPercentage ) + "%");
                    //            dataResult = dataResult.replace("appletonOtherCostPercentage", Math.round(fixtureValueObjectAppleton.totalOtherCostPercentage ) + "%");
                    //        }
                    //    }

                    //    if (fixtureValueObjectProposal != null) {
                    //        if (fixtureValueObjectProposal.totalInitialNetInvestment != null) {
                    //            dataResult = dataResult.replace("proposalNetInvestment", Math.round(fixtureValueObjectProposal.totalInitialNetInvestment ));
                    //            dataResult = dataResult.replace("proposalFixtureMaintenance", Math.round(fixtureValueObjectProposal.totalFixtureMaintenance ));
                    //            dataResult = dataResult.replace("proposalEnergyConsumed", Math.round(fixtureValueObjectProposal.totalEnergyConsumed ));
                    //            dataResult = dataResult.replace("proposalOtherCost", Math.round(fixtureValueObjectProposal.totalOtherCost ));
                    //            dataResult = dataResult.replace("proposalTotalFixyureSummaryCost", Math.round(fixtureValueObjectProposal.totalExistingFixtureCost ));
                    //            dataResult = dataResult.replace("proposalNetInvestmentPercentage", Math.round(fixtureValueObjectProposal.totalInitialNetInvestmentPercentage ) + "%");
                    //            dataResult = dataResult.replace("proposalFixtureMaintenancePercentage", Math.round(fixtureValueObjectProposal.totalFixtureMaintenancePercentage ) + "%");
                    //            dataResult = dataResult.replace("proposalEnergyConsumedPercentage", Math.round(fixtureValueObjectProposal.totalEnergyConsumedPercentage ) + "%");
                    //            dataResult = dataResult.replace("proposalOtherCostPercentage", Math.round(fixtureValueObjectProposal.totalOtherCostPercentage ) + "%");
                    //        }
                    //    }

                    //    var userString = $.cookie("User");
                    //    var totalYear;
                    //    if (userString != null) {
                    //        var user = JSON.parse(userString);
                    //        totalYear = parseInt(user.timeperiod);
                    //    }

                    //    //For Proposal A
                    //    var netInvestment_ProposalA = ((Math.round(fixtureValueObjectAppleton.totalInitialNetInvestment )) - (Math.round(fixtureValueObjectExisting.totalInitialNetInvestment )));
                    //    var totalFixtureMaintenanceSaving_ProposalA = ((Math.round(fixtureValueObjectExisting.totalFixtureMaintenance )) - (Math.round(fixtureValueObjectAppleton.totalFixtureMaintenance )));
                    //    var totalEnergySaving_ProposalA = ((Math.round(fixtureValueObjectExisting.totalEnergyConsumed )) - (Math.round(fixtureValueObjectAppleton.totalEnergyConsumed )));
                    //    var otherCostSaving_ProposalA = ((Math.round(fixtureValueObjectExisting.totalOtherCost )) - (Math.round(fixtureValueObjectAppleton.totalOtherCost )));
                    //    var yearlySaving_ProposalA = (totalFixtureMaintenanceSaving_ProposalA + totalEnergySaving_ProposalA + otherCostSaving_ProposalA) / totalYear;
                    //    var totalPayback_ProposalA = (netInvestment_ProposalA / yearlySaving_ProposalA);

                    //    //For Proposal B
                    //    var netInvestment_ProposalB = ((Math.round(fixtureValueObjectProposal.totalInitialNetInvestment )) - (Math.round(fixtureValueObjectExisting.totalInitialNetInvestment )));
                    //    var totalFixtureMaintenanceSaving_ProposalB = ((Math.round(fixtureValueObjectExisting.totalFixtureMaintenance )) - (Math.round(fixtureValueObjectProposal.totalFixtureMaintenance )));
                    //    var totalEnergySaving_ProposalB = ((Math.round(fixtureValueObjectExisting.totalEnergyConsumed )) - (Math.round(fixtureValueObjectProposal.totalEnergyConsumed )));
                    //    var otherCostSaving_ProposalB = ((Math.round(fixtureValueObjectExisting.totalOtherCost )) - (Math.round(fixtureValueObjectProposal.totalOtherCost )));
                    //    var yearlySaving_ProposalB = (totalFixtureMaintenanceSaving_ProposalB + totalEnergySaving_ProposalB + otherCostSaving_ProposalB) / totalYear;
                    //    var totalPayback_ProposalB = (netInvestment_ProposalB / yearlySaving_ProposalB);

                    //    var savingOverExisting_ProposalA = (totalFixtureMaintenanceSaving_ProposalA + totalEnergySaving_ProposalA + otherCostSaving_ProposalA) < 0 ? "NA" : (Math.round((totalFixtureMaintenanceSaving_ProposalA + totalEnergySaving_ProposalA + otherCostSaving_ProposalA) ));
                    //    var savingOverExisting_ProposalB = (totalFixtureMaintenanceSaving_ProposalB + totalEnergySaving_ProposalB + otherCostSaving_ProposalB) < 0 ? "NA" : (Math.round((totalFixtureMaintenanceSaving_ProposalB + totalEnergySaving_ProposalB + otherCostSaving_ProposalB) ));

                    //    var averageYearlySaving_ProposalA = yearlySaving_ProposalA < 0 ? "NA" : (Math.round(yearlySaving_ProposalA ));
                    //    var averageYearlySaving_ProposalB = yearlySaving_ProposalB < 0 ? "NA" : (Math.round(yearlySaving_ProposalB ));

                    //    var averagePayback_ProposalA = (totalPayback_ProposalA < 0 ? "NA" : (Math.round(totalPayback_ProposalA )));
                    //    var averagePayback_ProposalB = (totalPayback_ProposalB < 0 ? "NA" : (Math.round(totalPayback_ProposalB )));

                    //    dataResult = dataResult.replace("savingOverExisting", savingOverExisting_ProposalA);
                    //    dataResult = dataResult.replace("savingOverExisting2", savingOverExisting_ProposalB);

                    //    dataResult = dataResult.replace("avgYearlySaving", averageYearlySaving_ProposalA);
                    //    dataResult = dataResult.replace("avgYearlySaving2", averageYearlySaving_ProposalB);

                    //    dataResult = dataResult.replace("paybackPeriod", averagePayback_ProposalA);
                    //    dataResult = dataResult.replace("paybackPeriod2", averagePayback_ProposalB);



                    var emailId = $(".email").val();
                    if (emailId == "" || emailId == null) {

                        bootbox.prompt({
                            title: "Please provide an email address so we can send the report!",
                            inputType: 'email',
                            callback: function (result) {
                                emailId = result;

                                if (emailId != null) {
                                    if (validateEmail(emailId)) {
                                        if ($(".warningMessage").length > 0) {
                                            $(".warningMessage").remove();
                                        }
                                        $(".email").val(emailId);
                                        var dialog = bootbox.dialog({
                                            message: '<p class="text-center">Please wait while we send the email...</p>',
                                            closeButton: false
                                        });

                                        setTimeout(function () {
                                            // do something in the background
                                            sendEmailToDistributor();
                                            dialog.modal('hide');
                                        }, 2000);
                                    }
                                    else {
                                        if ($(".warningMessage").length == 0) {
                                            $(".bootbox-input-email").parent().append("<p class='warningMessage' style='color:red'>You have entered an invalid email address</p>");
                                        }

                                        return false;
                                    }

                                }

                            }
                        });
                    } else {
                        var dialog = bootbox.dialog({
                            message: '<p class="text-center">Please wait while we send the email...</p>',
                            closeButton: false
                        });
                        setTimeout(function () {
                            // do something in the background
                            sendEmailToDistributor();
                            dialog.modal('hide');
                        }, 2000);
                    }




                    //});

                });
            });
            $(".tablinks").eq(0).trigger("click");
            $(".tablinks").eq(1).click();
            $(".tablinks").eq(2).click();
            //$(".tablinks").eq(0).click();


            $.cookie("configuration", "existing");
            $.cookie("ficture", "ficture1");

            //setCurrentCaculationCookie();
            //getCurrentCaculationCookie();
            //calculateExistingSummary();

        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function updateWattValue() {
    calculateExistingSummary();
}

function showReport() {
    var isValid = validateRequiredFields();
    if (isValid == true) {
        $(".btnNext").click();
    }
}

function openCalculator(evt, calcName) {

    var i, tabcontent, tablinks;

    var configuration = $.cookie("configuration");
    var calcNameUpdate = calcName.replace("Configuration", "");
    var containerDetail = "";
    var isValid = true;
    if (configuration == "proposal") {
        containerDetail = "Container";
    } else {
        containerDetail = "ConfigurationContainer";
    }
    if (configuration != calcNameUpdate && $("#" + configuration + containerDetail).html() != undefined) {
        if ($("#" + configuration + containerDetail).html().trim().length != 0) {
            setCurrentCaculationCookie();
            isValid = validateRequiredFields();
        }

    }
    if (isValid == true) {

        $(".yeartotalcostspan").text($(".timeperiod").val());

        if ($("#" + calcName + "Container").html().trim().length == 0) {
            var nextHTMLUrl = applicationurl + "/HTML/NextPage.html";
            if (calcName == "appletonConfiguration") {
                nextHTMLUrl = applicationurl + "/HTML/tabAppleton.html";
            }
            $("#" + calcName + "Container").load(nextHTMLUrl, function () {

                $(".yeartotalcostspan").text($(".timeperiod").val());
                $(".timeperiod").val($(".timeperiod").val());
                $(".energycost").val($(".energyRate").val());

                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover({
                        html: true,
                        container: 'body',
                        placement: 'right',
                        trigger: 'hover',
                        width: '800px'
                    });
                });


                var userString = $.cookie("User");
                if (userString != null) {
                    var currencyValue = $('.ddlcurrency').val();
                    if (currencyValue != null && currencyValue != "") {
                        currencyValue = currencyValue.split("-")[1];
                        $(".currency").text(currencyValue);
                    }

                } else {
                    $(".currency").text("$");
                }


                if (nextHTMLUrl.indexOf("tabAppleton") > -1) {
                    var data;
                    $(".btnNext1").addClass("active");
                    $.get(applicationurl + "/Data/AppletonLigthData.txt", function (dataResult) {
                        var areaClass = $(".areaClass").val();

                        data = JSON.parse(dataResult);
                        //*******DDslick
                        var dataLED = $.grep(data.Led, function (n, i) {
                            if (areaClass == n.AreaClassification) {
                                return n;
                            }
                        });
                        data.Led = dataLED;
                        var dataValue = [];
                        var dataSet = {};
                        dataSet.text = "Select fixture series";
                        dataValue.push(dataSet);
                        var selectedSeries = "";
                        $.each(data.Led, function (i, value) {
                            var dataSet = {};
                            dataSet.text = value.Name;
                            dataSet.imageSrc = applicationurl + "/Image/" + value.Image + ".jpg";
                            dataSet.description = "<a target='_blank' href='" + value.ProductPage + "'>" + value.Description + "</a>";
                            dataValue.push(dataSet);
                        });
                        $('#ddlLedSeries').ddslick({
                            data: dataValue,
                            width: 300,
                            imagePosition: "left",
                            onSelected: function (selectedData) {
                                selectedSeries = selectedData.selectedData.text;
                                $(':input').css("border-color", "");
                                $(".warningInfo").hide();
                                var series = $.grep(data.Led, function (n, i) {
                                    if (selectedSeries == n.Name) {
                                        return n;
                                    }
                                });

                                if (series != null && series.length > 0) {
                                    $(".productLink").attr("href", series[0].ProductPage);
                                    $('.seriespn').find('option').remove();
                                    $.each(series[0].Model, function (i, value) {
                                        $('.seriespn').append($('<option>').text(value.ModelNo).attr('value', value.ModelNo));
                                    });

                                    $('.hidEquivalent').find('option').remove();
                                    $.each(series[0].Model, function (i, value) {
                                        $('.hidEquivalent').append($('<option>').text(value.HIDEquivalent).attr('value', value.HIDEquivalent));
                                    });
                                }
                                if (series != null && series.length > 0) {
                                    var systemWattage = $.grep(series[0].Model, function (n, i) {
                                        if ($('.seriespn').find(":selected").text() == n.ModelNo) {
                                            return n.SystemWattage;
                                        }
                                    });

                                    if (systemWattage != null && systemWattage.length > 0) {
                                        $(".appSystemWatt").val(systemWattage[0].SystemWattage);
                                        $(".nominalLuments").eq(0).val(systemWattage[0].NominalLumens);
                                    }

                                }
                                fixtureCompleteAction();
                                calculateExistingSummary();
                            }


                        });
                        getCurrentCaculationCookie();
                        calculateExistingSummary();
                        $('.seriespn').change(function () {
                            var series = $.grep(data.Led, function (n, i) {
                                if (selectedSeries == n.Name) {
                                    return n;
                                }
                            });
                            if (series != null && series.length > 0) {
                                var systemWattage = $.grep(series[0].Model, function (n, i) {
                                    if ($('.seriespn').find(":selected").text() == n.ModelNo) {
                                        return n.SystemWattage;
                                    }
                                });

                                if (systemWattage != null && systemWattage.length > 0) {
                                    $(".appSystemWatt").val(systemWattage[0].SystemWattage);
                                    $(".nominalLuments").eq(0).val(systemWattage[0].NominalLumens);
                                    $('.hidEquivalent').val(systemWattage[0].HIDEquivalent);
                                }

                            }


                            calculateExistingSummary();

                        });

                        $('.hidEquivalent').change(function () {
                            var series = $.grep(data.Led, function (n, i) {
                                if (selectedSeries == n.Name) {
                                    return n;
                                }
                            });
                            if (series != null && series.length > 0) {
                                var systemWattage = $.grep(series[0].Model, function (n, i) {
                                    if ($('.hidEquivalent').find(":selected").text() == n.HIDEquivalent) {
                                        return n.SystemWattage;
                                    }
                                });

                                if (systemWattage != null && systemWattage.length > 0) {
                                    $(".appSystemWatt").val(systemWattage[0].SystemWattage);
                                    $(".nominalLuments").eq(0).val(systemWattage[0].NominalLumens);
                                    $('.seriespn').val(systemWattage[0].ModelNo);
                                }

                            }
                            calculateExistingSummary();


                        });
                        fixtureCompleteAction();

                    });



                } else {
                    $(".btnNext1").addClass("active");
                    var count = 0;
                    var countData = 0;
                    if (calcName == "existingConfiguration") {
                        $.cookie("configuration", "existing");
                        count = 0;
                        countData = 0;
                    } else if (calcName == "appletonConfiguration") {
                        $.cookie("configuration", "appleton");
                        count = 1;
                    } else if (calcName == "proposal") {
                        $.cookie("configuration", "proposal");
                        count = 2;
                        countData = 1;
                        var panelhead1 = $(".panel-heading").eq(8).text();
                        var panelhead2 = $(".panel-heading").eq(9).text();
                        var panelhead3 = $(".panel-heading").eq(10).text();
                        panelhead1 = panelhead1.replace("Existing", $('#alternate').text());
                        panelhead2 = panelhead2.replace("Existing", $('#alternate').text());
                        panelhead3 = panelhead3.replace("Existing", $('#alternate').text());
                        $(".panel-heading").eq(8).text(panelhead1);
                        $(".panel-heading").eq(9).text(panelhead2);
                        $(".panel-heading").eq(10).text(panelhead3);
                    } else {
                        $.cookie("configuration", "existing")
                    }
                    $.cookie("ficture", "ficture1");


                    getCurrentCaculationCookie();
                    calculateExistingSummary();



                    /* $.get(applicationurl+"/Data/AppletonLigthData.txt", function(dataResult) {
                         var data = JSON.parse(dataResult);
                         //Lamp change event
                        $(".lamp").eq(countData).change(function() {
                             var lamp = $(".lamp").eq(countData).val();
                             if (lamp == "High Pressure Sodium" || lamp == "Metal Halide" || lamp == "Pulse Start Metal Halide" || lamp == "*Mercury Vapor") {
                                 $(".ballast").eq(countData).val("1.2");
                             } else {
                                 $(".ballast").eq(countData).val("1");
                             }
 
                             var dataIndex = $(".lamp option:selected").eq(countData).attr("data");
                             $(".lampInfo").attr("data-content", "<img  src='/en-us/Appleton%20Assets/Image/lamps/lamp" + dataIndex + ".PNG'></a>")
 
                             var watt = $(".watt").eq(count).val() == "" ? 0 : parseFloat($(".watt").eq(count).val());
                             var ballast = $(".ballast").eq(countData).val() == "" ? 0 : parseFloat($(".ballast").eq(countData).val());
                             var systemWatt = watt * ballast;
                             if (systemWatt > 0) {
                                 $(".systemwatt").eq(countData).val(Math.round(systemWatt ));
                             }
                             //Bind life
                             var lampValue = $.grep(data.ExistingLampLife, function(n, i) {
                                 if ($('.lamp').eq(countData).find(":selected").text() == n.LampType) {
                                     return n.LampLife;
                                 }
                             });
 
                             if (lampValue != null && lampValue.length > 0) {
                                 $(".life").eq(count).val(lampValue[0].LampLife);
                             }
                             calculateExistingSummary();
                             fixtureCompleteAction();
 
                         });
                     });*/

                    //Updated code starts
                    $.get(applicationurl + "/Data/LampData.txt", function (dataResult) {
                        var data = JSON.parse(dataResult);



                        $(".lamp").eq(countData).change(function () {
                            var configuration = $.cookie("configuration");
                            if (configuration == "existing") {
                                countData = 0;
                                count = 0;
                            }
                            else if (configuration == "proposal") {
                                countData = 1;
                                count = 2;
                            }
                            var lamp = $(".lamp").eq(countData).val();

                            if (lamp == "High Pressure Sodium" || lamp == "Mercury Vapor" || lamp == "Metal Halide" || lamp == "Pulse Start Metal Halide" || lamp == "T5 Fluorescent") {
                                $(".replaceball").eq(count).val("1");
                                var timeperiod = $(".timeperiod").val();
                                if ((timeperiod / 5) >= 1) {
                                    $(".ballchange").eq(count).val((timeperiod / 5));
                                }
                                else {
                                    $(".ballchange").eq(count).val(0);
                                }

                            }
                            else {
                                $(".ballcost").eq(count).val(0);
                                $(".replaceball").eq(count).val(0);
                                $(".ballchange").eq(count).val(0);
                            }
                            $(".wattValue").val("");
                            $(".wattValue").hide();
                            if (data != null) {
                                if (data.Lamp.length > 0) {
                                    var lampValue = $.grep(data.Lamp, function (n, i) {
                                        if ($('.lamp').eq(countData).find(":selected").text() == n.Name) {
                                            return n;
                                        }
                                    });
                                    $(".ballast").eq(countData).val(lampValue[0].BCF);
                                    $('.watt').find('option').remove();
                                    $.each(lampValue[0].Wattage, function (i, value) {
                                        $('.watt').eq(countData).append($('<option>').text(value).attr('value', value));
                                    });

                                    $(".life").eq(count).val(lampValue[0].life);
                                }

                                if ($('.lamp').eq(countData).find(":selected").text() == "LED") {
                                    //bootbox.prompt("Please enter wattage value for LED", function(result){ console.log(result); });
                                    $(".wattValue").show();
                                    $('#myModal').modal('show');


                                }

                                if ($('.lamp').eq(countData).find(":selected").text() == "Fluorescent") {
                                    bootbox.prompt("Please enter number of Lamps", function (result) {
                                        $(".lampNumber").eq(countData).val(result);
                                        calculateExistingSummary();
                                    });
                                }
                            }


                            var dataIndex = $(".lamp option:selected").eq(countData).attr("data");
                            var lampDescription = "";
                            $.ajax({
                                url: applicationurl + "/Data/LampData.txt",
                                type: "get",
                                async: false,
                                success: function (dataResult) {
                                    var data = JSON.parse(dataResult);
                                    if (data != null) {
                                        if (data.Lamp.length > 0) {
                                            lampDescription = $.grep(data.Lamp, function (n, i) {
                                                if ($('.lamp').eq(countData).find(":selected").text() == n.Name) {
                                                    return n;
                                                }
                                            });
                                        }
                                    }


                                },
                                error: function () {

                                }
                            });
                            $(".lampInfo").attr("data-content", lampDescription[0].Description);

                            var watt = $(".watt").eq(countData).val() == "" ? 0 : parseFloat($(".watt").eq(countData).val());
                            var ballast = $(".ballast").eq(countData).val() == "" ? 0 : parseFloat($(".ballast").eq(countData).val());
                            var systemWatt = watt * ballast;
                            if (systemWatt > 0) {
                                $(".systemwatt").eq(countData).val(Math.round(systemWatt));
                            }
                            calculateExistingSummary();

                        });

                        $(".btnSave").click(function () {

                            var configuration = $.cookie("configuration");
                            if (configuration == "existing") {
                                countData = 0;
                                count = 0;
                            }
                            else if (configuration == "proposal") {
                                countData = 1;
                                count = 2;
                            }

                            var wattage = $("#txtWattage").val();
                            var lampLife = $("#txtLife").val();
                            $(".wattValue").eq(countData).show();
                            $(".wattValue").eq(countData).val(wattage);
                            $(".life").eq(count).val(lampLife);
                            //$("#txtWattage").val("");
                            //$("#txtLife").val("");
                            $('#myModal').modal('hide');
                            calculateExistingSummary();
                        });

                    });

                    $(".watt").eq(countData).change(function () {
                        var watt = $(".watt").eq(countData).val() == "" ? 0 : $(".watt").eq(countData).val();
                        if (watt != "Others") {
                            watt = parseFloat($(".watt").eq(countData).val());
                            $(".wattValue").val("");
                            $(".wattValue").hide();
                            var ballast = $(".ballast").eq(countData).val() == "" ? 0 : parseFloat($(".ballast").eq(countData).val());
                            var systemWatt = 0;
                            if ($('.lamp').eq(countData).find(":selected").text() != "Fluorescent") {
                                systemWatt = watt * ballast;
                            }
                            else {
                                var lampNumber = $(".lampNumber").eq(countData).val();
                                systemWatt = lampNumber * watt * ballast;
                            }
                            if (systemWatt > 0) {
                                $(".systemwatt").eq(countData).val(Math.round(systemWatt));
                            }
                            calculateExistingSummary();
                        }
                        else {
                            $(".wattValue").show();
                        }

                    });

                    //Updated code ends

                }




                //Button event 
                $(".btnNext1").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").addClass("active");
                        $(".btnNext2").removeClass("active");
                        $(".btnNext3").removeClass("active");
                        $(".btnNext4").removeClass("active");

                        if ($.cookie("ficture") != "ficture1") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture1");
                            //$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }

                });

                $(".btnNext2").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").removeClass("active");
                        $(".btnNext2").addClass("active");
                        $(".btnNext3").removeClass("active");
                        $(".btnNext4").removeClass("active");

                        if ($.cookie("ficture") != "ficture2") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture2");
                            //$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }
                });

                $(".btnNext3").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").removeClass("active");
                        $(".btnNext2").removeClass("active");
                        $(".btnNext3").addClass("active");
                        $(".btnNext4").removeClass("active");

                        if ($.cookie("ficture") != "ficture3") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture3");
                            ////$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }
                });
                $(".btnNext4").click(function () {
                    var isValid = validateRequiredFields();
                    if (isValid == true) {
                        $(".btnNext1").removeClass("active");
                        $(".btnNext2").removeClass("active");
                        $(".btnNext3").removeClass("active");
                        $(".btnNext4").addClass("active");

                        if ($.cookie("ficture") != "ficture4") {
                            setCurrentCaculationCookie();
                            $.cookie("ficture", "ficture4");
                            ////$(':input').val('');
                            getCurrentCaculationCookie();
                            calculateExistingSummary();
                        }
                        fixtureCompleteAction();
                    }
                });
                fixtureCompleteAction();
            });
        }


        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(calcName).style.display = "block";
        if (evt.currentTarget != undefined) {
            evt.currentTarget.className += " active";
        }


        if (calcName == "existingConfiguration") {
            $.cookie("configuration", "existing")
        } else if (calcName == "appletonConfiguration") {
            $.cookie("configuration", "appleton")
        } else if (calcName == "proposal") {
            $.cookie("configuration", "proposal")
        }
        $.cookie("ficture", "ficture1");
        //setCurrentCaculationCookie();
        getCurrentCaculationCookie();
        calculateExistingSummary();
        fixtureCompleteAction();
        $(".btnNext1").addClass("active");
        $(".btnNext2").removeClass("active");
        $(".btnNext3").removeClass("active");
        $(".btnNext4").removeClass("active");

    }

}

function updateTab() {

    $(".timeperiod").eq(1).val($(".timeperiod").eq(0).val());
    $(".tablinks").eq(0).click();

}

function setUserDetails() {
    var name = $(".name").val();
    var lastName = $(".lastName").val();
    var email = $(".email").val();
    var phone = $(".phone").val();
    var company = $(".company").val();
    var companyAddress = $(".companyAddress").val();
    var state = $(".state").val();
    var country = $(".country").val();
    var zip = $(".zip").val();
    var projectName = $(".projectName").val();
    var installationType = $('.installationType input:radio:checked').val();
    var application = $(".application").val();
    if (application == "Other") {
        application = "Other" + $(".applicationValue").val();
    }
    var currency = $(".ddlcurrency").val();
    var energyRate = $(".energyRate").val();
    var timeperiod = $(".timeperiod").val();
    //var acceptEmersonCom = $(".chkbxAgree").prop("checked");
    //var acceptEmersonCom = $(".chkbxAgree").prop("checked");

    var user = {};
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.company = company;
    user.companyAddress = companyAddress;
    user.state = state;
    user.country = country;
    user.zip = zip;
    user.projectName = projectName;
    user.installationType = installationType;
    user.application = application;
    user.currency = currency;
    user.energyRate = energyRate;
    user.timeperiod = timeperiod;

    $.cookie("User", JSON.stringify(user));


}

function getUserDetails() {
    var userString = $.cookie("User");
    if (userString != null) {
        var user = JSON.parse(userString);
        $(".name").val(user.name);
        $(".lastName").val(user.lastName);
        $(".email").val(user.email);
        $(".phone").val(user.phone);
        $(".company").val(user.company);
        $(".companyAddress").val(user.companyAddress);
        $(".state").val(user.state);
        $(".country").val(user.country);
        $(".zip").val(user.zip);
        $(".projectName").val(user.projectName);
        $('#' + user.installationType).prop("checked", true);
        if (user.application.indexOf("Other") > -1) {
            user.application = user.application.replace("Other", "");
            $(".application").val("Other");
            $(".applicationValue").val(user.application);
            $(".applicationValue").show();
        }
        else {
            $(".application").val(user.application);
        }
        $(".ddlcurrency").val(user.currency);
        $(".energyRate").val(user.energyRate);
        $(".timeperiod").val(user.timeperiod);
    }

}


function setCurrentCaculationCookie() {
    var configuration = $.cookie("configuration");
    var fixture = $.cookie("ficture");
    var count = 0;
    var countExist = 0;
    var appletonLeadSeries = "";
    var appletonLeadSeriesIndex = "";
    var seriesPartNumber = "";
    var hidEquivalent = "";
    var nominalLuments = "";
    var areaClass = "";
    if (configuration == "existing") {
        count = 0;
        countExist = 0;
    } else if (configuration == "appleton") {
        count = 1;
        var ddlSeriesVal = $('#ddlLedSeries').data('ddslick');
        appletonLeadSeries = ddlSeriesVal.selectedData.text;
        appletonLeadSeriesIndex = ddlSeriesVal.selectedIndex;
        seriesPartNumber = $(".seriespn").eq(0).find(":selected").text();
        hidEquivalent = $(".hidEquivalent").val();
        nominalLuments = $(".nominalLuments").val();
        areaClass = $(".areaClass").val();
    } else if (configuration == "proposal") {
        count = 2;
        countExist = 1;
    }

    var energyCost = $(".energycost").eq(count).val();
    var timePeriod = $(".timeperiod").eq(count + 1).val();
    var part = $(".part").eq(countExist).val();
    var lamp = $(".lamp").eq(countExist).val();
    var life = $(".life").eq(count).val();
    var watt = "";
    var wattValue = 0;
    var appletonLampLife = 0;
    var systemWatt;
    if (count == 1) {
        systemWatt = $(".appSystemWatt").val();
        watt = $(".appSystemWatt").val();
        if (life == "0") {
            appletonLampLife = $(".lifeValApp").val();
        }

    } else {
        watt = $(".watt").eq(countExist).val();
        if (watt == "Others") {
            wattValue = $(".wattValue").eq(countExist).val();
        }
        systemWatt = $(".systemwatt").eq(countExist).val();
    }
    var quantity = $(".quantity").eq(count).val();
    var ballast = $(".ballast").eq(countExist).val();
    var fixedcost = $(".fixedcost").eq(count).val();
    var instcost = $(".instcost").eq(count).val();
    var runtime = $(".runtime").eq(count).val();

    var laborrate = $(".laborrate").eq(count).val();
    var relamp = $(".relamp").eq(count).val();
    var lampcost = $(".lampcost").eq(count).val();
    var lampdisposal = $(".lampdisposal").eq(count).val();
    var ballcost = $(".ballcost").eq(count).val();
    var balldisposal = $(".balldisposal").eq(count).val();
    var replaceball = $(".replaceball").eq(count).val();
    var ballchange = $(".ballchange").eq(count).val();
    var maintenance = $(".maintenance").eq(count).val();
    var incentive = $(".incentive").eq(count).val();

    //Summary Value
    var fixturePlusInstall = replaceAll($(".fixinst").eq(count).val(), ",");
    var relampCost = replaceAll($(".costtorelamp").eq(count).val(), ",");
    var relampTime = replaceAll($(".howoftenrelamp").eq(count).val(), ",");
    var totalRelampCost = replaceAll($(".totalrelamp").eq(count).val(), ",");
    var totalBallastCost = replaceAll($(".totalball").eq(countExist).val(), ",");
    var energyUsedPerYear = replaceAll($(".energyused").eq(count).val(), ",");
    var totalenergycost = replaceAll($(".totalenergycost").eq(count).val(), ",");
    var totalCost = replaceAll($(".totalcost").eq(count).val(), ",");
    var driverReplacementCost = 0;
    if (count == 1) {
        driverReplacementCost = replaceAll($(".driverReplacementCost").val(), ",");
    }

    //Total fixtureSummary value
    var totalInitialNetInvestment = replaceAll($(".intnetinv1").eq(count).val(), ",");
    var totalEnergyUsed = "";
    if (count == 1) {
        totalEnergyUsed = $("#totalEnergyUserAppleton").val();
    }
    else {
        totalEnergyUsed = $("#totalEnergyUserExisting").eq(countExist).val();
    }

    var totalFixtureMaintenance = replaceAll($(".fixmain1").eq(count).val(), ",");
    var totalEnergyConsumed = replaceAll($(".engcon1").eq(count).val(), ",");
    //var totalOtherCost = replaceAll($(".other1").eq(count).val(), ",");
    var totalExistingFixtureCost = replaceAll($(".yeattotalcost").eq(count).val(), ",");
    var totalInitialNetInvestmentPercentage = $(".intnetinv2").eq(count).val().replace('%', '');
    var totalFixtureMaintenancePercentage = $(".fixmain2").eq(count).val().replace('%', '');
    var totalEnergyConsumedPercentage = $(".engcon2").eq(count).val().replace('%', '');
    //var totalOtherCostPercentage = $(".other2").eq(count).val().replace('%', '');


    var formdata = {};
    formdata.configuration = configuration;
    var FictureArray = [];
    var fictureObject = {};
    fictureObject.fixture = fixture;
    fictureObject.energyCost = energyCost;
    fictureObject.timePeriod = timePeriod;
    fictureObject.part = part;
    fictureObject.lamp = lamp;
    fictureObject.watt = watt;
    fictureObject.wattValue = wattValue;
    fictureObject.systemWatt = systemWatt;
    fictureObject.quantity = quantity;
    fictureObject.ballast = ballast;
    fictureObject.fixedcost = fixedcost;
    fictureObject.appletonLampLife = appletonLampLife;
    fictureObject.areaClass = areaClass;
    fictureObject.instcost = instcost;
    fictureObject.runtime = runtime;
    fictureObject.life = life;
    fictureObject.laborrate = laborrate;
    fictureObject.relamp = relamp;
    fictureObject.lampcost = lampcost;
    fictureObject.lampdisposal = lampdisposal;
    fictureObject.ballcost = ballcost;
    fictureObject.balldisposal = balldisposal;
    fictureObject.replaceball = replaceball;
    fictureObject.ballchange = ballchange;
    fictureObject.maintenance = maintenance;
    fictureObject.incentive = incentive;
    fictureObject.appletonLeadSeries = appletonLeadSeries;
    fictureObject.appletonLeadSeriesIndex = appletonLeadSeriesIndex;
    fictureObject.seriesPartNumber = seriesPartNumber;
    fictureObject.hidEquivalent = hidEquivalent;
    fictureObject.nominalLuments = nominalLuments;
    //Summary Data
    fictureObject.fixturePlusInstall = fixturePlusInstall;
    fictureObject.relampCost = relampCost;
    fictureObject.relampTime = relampTime;
    fictureObject.totalRelampCost = totalRelampCost;
    fictureObject.totalBallastCost = totalBallastCost;
    fictureObject.energyUsedPerYear = energyUsedPerYear;
    fictureObject.totalenergycost = totalenergycost;
    fictureObject.totalCost = totalCost;
    fictureObject.driverReplacementCost = driverReplacementCost;
    //Total Fixture value

    formdata.totalInitialNetInvestment = totalInitialNetInvestment;
    formdata.totalEnergyUsed = totalEnergyUsed;
    formdata.totalFixtureMaintenance = totalFixtureMaintenance;
    formdata.totalEnergyConsumed = totalEnergyConsumed;
    // formdata.totalOtherCost = totalOtherCost;
    formdata.totalExistingFixtureCost = totalExistingFixtureCost;
    formdata.totalInitialNetInvestmentPercentage = totalInitialNetInvestmentPercentage;
    formdata.totalFixtureMaintenancePercentage = totalFixtureMaintenancePercentage;
    formdata.totalEnergyConsumedPercentage = totalEnergyConsumedPercentage;
    // formdata.totalOtherCostPercentage = totalOtherCostPercentage;




    FictureArray.push(fictureObject);
    formdata.fictureObject = FictureArray;

    var fixtureValueString = $.cookie("fixtureValue" + configuration);
    if (fixtureValueString != null) {
        var fixtureValueObject = JSON.parse(fixtureValueString);
        var isFixtureMatched = false;
        if (fixtureValueObject.fictureObject != null) {
            for (var i = 0; i < fixtureValueObject.fictureObject.length; i++) {
                if (fixtureValueObject.fictureObject[i] != null && fixtureValueObject.fictureObject[i].fixture == fixture) {
                    fixtureValueObject.fictureObject[i] = fictureObject;
                    fixtureValueObject.totalInitialNetInvestment = totalInitialNetInvestment;
                    fixtureValueObject.totalEnergyUsed = totalEnergyUsed;
                    fixtureValueObject.totalFixtureMaintenance = totalFixtureMaintenance;
                    fixtureValueObject.totalEnergyConsumed = totalEnergyConsumed;
                    //fixtureValueObject.totalOtherCost = totalOtherCost;
                    fixtureValueObject.totalExistingFixtureCost = totalExistingFixtureCost;
                    fixtureValueObject.totalInitialNetInvestmentPercentage = totalInitialNetInvestmentPercentage;
                    fixtureValueObject.totalFixtureMaintenancePercentage = totalFixtureMaintenancePercentage;
                    fixtureValueObject.totalEnergyConsumedPercentage = totalEnergyConsumedPercentage;
                    // fixtureValueObject.totalOtherCostPercentage = totalOtherCostPercentage;
                    isFixtureMatched = true;
                }
            }
            if (!isFixtureMatched) {
                fixtureValueObject.fictureObject[fixtureValueObject.fictureObject.length] = fictureObject;
                fixtureValueObject.totalInitialNetInvestment = totalInitialNetInvestment;
                fixtureValueObject.totalEnergyUsed = totalEnergyUsed;
                fixtureValueObject.totalFixtureMaintenance = totalFixtureMaintenance;
                fixtureValueObject.totalEnergyConsumed = totalEnergyConsumed;
                // fixtureValueObject.totalOtherCost = totalOtherCost;
                fixtureValueObject.totalExistingFixtureCost = totalExistingFixtureCost;
                fixtureValueObject.totalInitialNetInvestmentPercentage = totalInitialNetInvestmentPercentage;
                fixtureValueObject.totalFixtureMaintenancePercentage = totalFixtureMaintenancePercentage;
                fixtureValueObject.totalEnergyConsumedPercentage = totalEnergyConsumedPercentage;
                //fixtureValueObject.totalOtherCostPercentage = totalOtherCostPercentage;
            }
            $.cookie("fixtureValue" + configuration, JSON.stringify(fixtureValueObject));
        }
    } else {
        $.cookie("fixtureValue" + configuration, JSON.stringify(formdata));
    }



}

function getCurrentCaculationCookie() {
    var configuration = $.cookie("configuration");
    var count = 0;
    var countExist = 0;
    if (configuration == "existing") {
        count = 0;
        countExist = 0;
    } else if (configuration == "appleton") {
        count = 1;
    } else if (configuration == "proposal") {
        count = 2;
        countExist = 1;
    }
    var fixtureValueString = $.cookie("fixtureValue" + configuration);
    var fixtureValueObject = JSON.parse(fixtureValueString);

    var existingFixtureValueString = $.cookie("fixtureValueexisting");
    var existingFalueObject = JSON.parse(existingFixtureValueString);

    var fixture = $.cookie("ficture");
    if (fixtureValueObject != null) {
        if (fixtureValueObject.fictureObject != null) {
            $(".energycost").eq(count).val(existingFalueObject.fictureObject[0].energyCost);
            $(".timeperiod").eq(count + 1).val(existingFalueObject.fictureObject[0].timePeriod);
            var isFixtureAvailable = false;
            for (var i = 0; i < fixtureValueObject.fictureObject.length; i++) {
                if (fixtureValueObject.fictureObject[i] != null && fixtureValueObject.fictureObject[i].fixture == fixture) {
                    isFixtureAvailable = true;
                    var lamp = fixtureValueObject.fictureObject[i].lamp;
                    $(".lamp").eq(countExist).val(lamp);
                    $(".wattValue").hide();
                    var dataIndex = $(".lamp option:selected").eq(countExist).attr("data");
                    var lampDescription = "";
                    $.ajax({
                        url: applicationurl + "/Data/LampData.txt",
                        type: "get",
                        async: false,
                        success: function (dataResult) {
                            var data = JSON.parse(dataResult);
                            if (data != null) {
                                if (data.Lamp.length > 0) {
                                    lampDescription = $.grep(data.Lamp, function (n, i) {
                                        if ($('.lamp').eq(countExist).find(":selected").text() == n.Name) {
                                            return n;
                                        }
                                    });
                                }
                            }


                        },
                        error: function () {

                        }
                    });
                    if (lampDescription.length > 0) {
                        $(".lampInfo").attr("data-content", lampDescription[0].Description);
                    }


                    // $(".lampInfo").attr("data-content", "<img  src='/en-us/Appleton%20Assets/Image/lamps/lamp" + dataIndex + ".PNG'></a>")
                    /*if (lamp == "High Pressure Sodium" || lamp == "Metal Halide" || lamp == "Pulse Start Metal Halide" || lamp == "*Mercury Vapor") {
                        $(".ballast").eq(countExist).val("1.2");
                    } else {
                        $(".ballast").eq(countExist).val("1");
                    }*/
                    if (count == 1) {
                        //$(".ledseries").find(":selected").eq(0).text(fixtureValueObject.fictureObject[i].appletonLeadSeries);
                        //$(".seriespn").find(":selected").eq(0).text(fixtureValueObject.fictureObject[i].seriesPartNumber);
                        //$(".ledseries").val(fixtureValueObject.fictureObject[i].appletonLeadSeries);
                        $(".areaClass").val(fixtureValueObject.fictureObject[i].areaClass);
                        $('#ddlLedSeries').ddslick('select', {
                            index: fixtureValueObject.fictureObject[i].appletonLeadSeriesIndex
                        });
                        $(".seriespn").val(fixtureValueObject.fictureObject[i].seriesPartNumber);
                        $(".hidEquivalent").val(fixtureValueObject.fictureObject[i].hidEquivalent);
                        $(".nominalLuments").val(fixtureValueObject.fictureObject[i].nominalLuments);
                        $(".appSystemWatt").val(fixtureValueObject.fictureObject[i].watt);
                        $(".laborrate").eq(count).val(fixtureValueObject.fictureObject[i].laborrate);



                        if (fixtureValueObject.fictureObject[i].life == "0") {
                            $(".lifeValApp").val(fixtureValueObject.fictureObject[i].appletonLampLife);
                            $(".lifeValApp").show();
                        }
                    } else {
                        $(".systemwatt").eq(countExist).val(fixtureValueObject.fictureObject[i].systemWatt);
                        $(".part").eq(countExist).val(fixtureValueObject.fictureObject[i].part);
                        $(".ballast").eq(countExist).val(fixtureValueObject.fictureObject[i].ballast);

                        $(".laborrate").eq(count).val(existingFalueObject.fictureObject[i].laborrate);




                        $.ajax({
                            url: applicationurl + "/Data/LampData.txt",
                            type: "get",
                            async: false,
                            success: function (dataResult) {
                                var data = JSON.parse(dataResult);
                                if (data != null) {
                                    if (data.Lamp.length > 0) {
                                        var lampValue = $.grep(data.Lamp, function (n, i) {
                                            if ($('.lamp').eq(countExist).find(":selected").text() == n.Name) {
                                                return n;
                                            }
                                        });
                                        $('.watt').eq(countExist).find('option').remove();
                                        if (lampValue[0] != undefined) {
                                            $.each(lampValue[0].Wattage, function (i, value) {
                                                $('.watt').eq(countExist).append($('<option>').text(value).attr('value', value));
                                            });
                                        }

                                    }
                                }

                                $(".watt").eq(countExist).val(fixtureValueObject.fictureObject[i].watt);//wattValue
                                if (fixtureValueObject.fictureObject[i].watt == "Others") {
                                    $(".wattValue").show();
                                }
                                else {
                                    $(".wattValue").hide();
                                }
                                $(".wattValue").eq(countExist).val(fixtureValueObject.fictureObject[i].wattValue);
                            },
                            error: function () {

                            }
                        });

                    }
                    $(".quantity").eq(count).val(existingFalueObject.fictureObject[i].quantity);

                    if (existingFalueObject.fictureObject[i].runtime != "") {
                        $(".runtime").eq(count).val(existingFalueObject.fictureObject[i].runtime);
                    }
                    else {
                        $(".runtime").eq(count).val("24");
                    }

                    if (fixtureValueObject.fictureObject[i].fixedcost != "") {
                        $(".fixedcost").eq(count).val(fixtureValueObject.fictureObject[i].fixedcost);
                    }
                    else {
                        $(".fixedcost").eq(count).val("0");
                    }
                    if (fixtureValueObject.fictureObject[i].instcost != "") {
                        $(".instcost").eq(count).val(fixtureValueObject.fictureObject[i].instcost);
                    }
                    else {
                        $(".instcost").eq(count).val("0");
                    }

                    if (fixtureValueObject.fictureObject[i].relamp != "") {
                        $(".relamp").eq(count).val(fixtureValueObject.fictureObject[i].relamp);
                    }
                    else {
                        $(".relamp").eq(count).val("0.5");
                    }

                    $(".life").eq(count).val(fixtureValueObject.fictureObject[i].life);
                    //$(".relamp").eq(count).val(fixtureValueObject.fictureObject[i].relamp);
                    $(".lampcost").eq(count).val(fixtureValueObject.fictureObject[i].lampcost);
                    $(".lampdisposal").eq(count).val(fixtureValueObject.fictureObject[i].lampdisposal);
                    $(".ballcost").eq(count).val(fixtureValueObject.fictureObject[i].ballcost);
                    $(".balldisposal").eq(count).val(fixtureValueObject.fictureObject[i].balldisposal);
                    $(".replaceball").eq(count).val(fixtureValueObject.fictureObject[i].replaceball);
                    $(".ballchange").eq(count).val(fixtureValueObject.fictureObject[i].ballchange);
                    $(".maintenance").eq(count).val(fixtureValueObject.fictureObject[i].maintenance);
                    $(".incentive").eq(count).val(fixtureValueObject.fictureObject[i].incentive);

                }

            }
            if (!isFixtureAvailable) {
                if (count == 1) {
                    $('#ddlLedSeries').ddslick('select', {
                        index: 0
                    });
                    $(".quantity").eq(count).val("");
                    $(".runtime").eq(count).val("");
                    $(".laborrate").eq(count).val("");
                    $(".appSystemWatt").val("");
                    $(".areaClass").val("Hazardous");
                } else {
                    $(".lamp").eq(countExist).val("Select lamp");
                    $(".systemwatt").eq(countExist).val("");
                    $(".part").eq(countExist).val("");
                    $(".watt").eq(countExist).val("");
                    $(".quantity").eq(count).val(existingFalueObject.fictureObject[0].quantity);
                    $(".laborrate").eq(count).val(existingFalueObject.fictureObject[0].laborrate);

                    $(".wattValue").hide();
                }

                $(".runtime").eq(count).val("24");
                $(".fixedcost").eq(count).val("0");
                $(".instcost").eq(count).val("0");
                $(".life").eq(count).val("");
                $(".relamp").eq(count).val("0.5");
                $(".lampcost").eq(count).val("");
                $(".lampdisposal").eq(count).val("");
                $(".ballcost").eq(count).val("");
                $(".balldisposal").eq(count).val("");
                $(".replaceball").eq(count).val("");
                $(".ballchange").eq(count).val("");
                $(".maintenance").eq(count).val("");
                $(".incentive").eq(count).val("");
            }

        }

    }

}


function calculateExistingSummary() {
    var configuration = $.cookie("configuration");
    var fixture = $.cookie("ficture");
    var count = 0;
    var countData = 0;
    if (configuration == "existing") {
        count = 0;
        countData = 0;
    } else if (configuration == "appleton") {
        count = 1;
    } else if (configuration == "proposal") {
        count = 2;
        countData = 1;
    }

    var energyCost = $(".energycost").eq(count).val() == "" ? 0 : parseFloat($(".energycost").eq(count).val());
    var timePeriod = $(".timeperiod").eq(count + 1).val() == "" ? 0 : parseFloat($(".timeperiod").eq(count + 1).val());
    var part = $(".part").eq(countData).val() == "" ? 0 : parseFloat($(".part").eq(countData).val());
    var lamp = $(".lamp").eq(countData).val();
    var watt = 0;
    var ballast = $(".ballast").eq(countData).val() == "" ? 0 : parseFloat($(".ballast").eq(countData).val());
    var runtime = $(".runtime").eq(count).val() == "" ? 0 : parseFloat($(".runtime").eq(count).val());
    var life = $(".life").eq(count).val() == "" ? 0 : parseFloat($(".life").eq(count).val());
    var appletonLeadSeries = "";
    var systemWatt = 0;
    if (count == 1) {
        var ddlSeriesVal = $('#ddlLedSeries').data('ddslick');
        if (life == 0) {
            life = $(".lifeValApp").val();
        }
        if (ddlSeriesVal != undefined) {
            appletonLeadSeries = ddlSeriesVal.selectedData.text;
        }
        else {
            return false;
        }
        watt = $(".appSystemWatt").val() == "" ? 0 : parseFloat($(".appSystemWatt").val());
        systemWatt = watt;

        //Driver replacement cost 
        var fixtureRuntimeInHour = timePeriod * runtime * 365;
        $(".ballchange").eq(count).val(Math.floor(fixtureRuntimeInHour / life))

    } else {
        if ($(".watt").eq(countData).val() != "Others") {
            watt = $(".watt").eq(countData).val() == "" ? 0 : parseFloat($(".watt").eq(countData).val());
        }
        else {
            watt = $(".wattValue").eq(countData).val() == "" ? 0 : parseFloat($(".wattValue").eq(countData).val());
        }
        if ($('.lamp').eq(countData).find(":selected").text() != "Fluorescent") {
            systemWatt = watt * ballast;
        }
        else {
            var lampNumber = $(".lampNumber").eq(countData).val();
            systemWatt = lampNumber * watt * ballast;
        }
    }

    var quantity = $(".quantity").eq(count).val() == "" ? 0 : parseFloat($(".quantity").eq(count).val());;
    var fixedcost = $(".fixedcost").eq(count).val() == "" ? 0 : parseFloat($(".fixedcost").eq(count).val());
    var instcost = $(".instcost").eq(count).val() == "" ? 0 : parseFloat($(".instcost").eq(count).val());


    var laborrate = $(".laborrate").eq(count).val() == "" ? 0 : parseFloat($(".laborrate").eq(count).val());
    var timeToRelamp = $(".relamp").eq(count).val() == "" ? 0 : parseFloat($(".relamp").eq(count).val());
    var lampcost = $(".lampcost").eq(count).val() == "" ? 0 : parseFloat($(".lampcost").eq(count).val());
    var lampdisposal = $(".lampdisposal").eq(count).val() == "" ? 0 : parseFloat($(".lampdisposal").eq(count).val());
    var ballcost = $(".ballcost").eq(count).val() == "" ? 0 : parseFloat($(".ballcost").eq(count).val());
    var balldisposal = $(".balldisposal").eq(count).val() == "" ? 0 : parseFloat($(".balldisposal").eq(count).val());
    var replaceball = $(".replaceball").eq(count).val() == "" ? 0 : parseFloat($(".replaceball").eq(count).val());
    var ballchange = $(".ballchange").eq(count).val() == "" ? 0 : parseFloat($(".ballchange").eq(count).val());
    var maintenance = $(".maintenance").eq(count).val() == "" ? 0 : parseFloat($(".maintenance").eq(count).val());
    var incentive = $(".incentive").eq(count).val() == "" ? 0 : parseFloat($(".incentive").eq(count).val());

    var fixturePlusInstall = (fixedcost + instcost) * quantity;
    var relampCost = (laborrate * timeToRelamp) + lampcost + lampdisposal;
    var relampTime = (life / runtime) / 365 == Infinity ? 0 : (life / runtime) / 365;
    var totalRelampCost = 0;
    if (timePeriod > relampTime && relampTime != 0) {
        totalRelampCost = (relampCost * quantity * ((timePeriod / relampTime) - 1));
    }
    var totalBallastCost = (((laborrate * replaceball) + ballcost + balldisposal) * quantity * ballchange);
    var energyUsedPerYear = (systemWatt * quantity * runtime * 365) / 1000;
    var totalenergycost = (((systemWatt * runtime) / 1000) * energyCost) * quantity * timePeriod * 365;
    var totalCost = 0;
    var driverReplacementCost = 0;
    //update
    $(".systemwatt").eq(countData).val(Math.round(systemWatt));
    $(".fixinst").eq(count).val(Comma((Math.round(fixturePlusInstall))));
    $(".costtorelamp").eq(count).val(Comma((Math.round(relampCost))));
    $(".howoftenrelamp").eq(count).val(Comma((Math.round(relampTime * 10) / 10)));
    $(".totalrelamp").eq(count).val(Comma((Math.round(totalRelampCost))));
    if (count != 1) {
        totalCost = (totalRelampCost + totalenergycost + (maintenance * quantity) + fixturePlusInstall + totalBallastCost - incentive);
        $(".totalball").eq(countData).val(Comma((Math.round(totalBallastCost))));
    }
    else {
        //driverReplacementCost
        driverReplacementCost = (ballchange * quantity * 100)
        $(".driverReplacementCost").val(Comma((Math.round(driverReplacementCost))));
        totalCost = (fixturePlusInstall + driverReplacementCost + totalenergycost + (maintenance * quantity) - incentive);
    }

    $(".energyused").eq(count).val(Comma((Math.round(energyUsedPerYear))));
    $(".totalenergycost").eq(count).val(Comma((Math.round(totalenergycost))));
    $(".totalcost").eq(count).val(Comma((Math.round(totalCost))));

    //Set the total fixture value
    var totalSummaryValue = calculateTotalExistingSFixture();
    var lampValue = "";
    if (configuration == "appleton") {
        lampValue = appletonLeadSeries;
    } else {
        lampValue = lamp;
    }
    if (lampValue != "Select lamp" && lampValue != "Select fixture series") {
        totalSummaryValue.intnetinv1 += (fixturePlusInstall - incentive);
        totalSummaryValue.totalEnergyUsed += parseFloat(energyUsedPerYear);
        if (count != 1) {
            totalSummaryValue.fixmain1 += (totalRelampCost + totalBallastCost);
        }
        else {
            totalSummaryValue.fixmain1 += (driverReplacementCost);
        }

        totalSummaryValue.engcon1 += totalenergycost;
        totalSummaryValue.other1 += (maintenance * quantity);
        totalSummaryValue.yeattotalcost += totalCost;
    }


    var intnetinv2 = 0;
    var fixmain2 = 0;
    var engcon2 = 0;
    var other2 = 0;
    if (totalSummaryValue.other1 < 0) {
        intnetinv2 = totalSummaryValue.intnetinv1 / (totalSummaryValue.intnetinv1 + totalSummaryValue.fixmain1 + totalSummaryValue.engcon1 - totalSummaryValue.other1);
        fixmain2 = totalSummaryValue.fixmain1 / (totalSummaryValue.intnetinv1 + totalSummaryValue.fixmain1 + totalSummaryValue.engcon1 - totalSummaryValue.other1);
        engcon2 = totalSummaryValue.engcon1 / (totalSummaryValue.intnetinv1 + totalSummaryValue.fixmain1 + totalSummaryValue.engcon1 - totalSummaryValue.other1);
        other2 = -(totalSummaryValue.other1 / (totalSummaryValue.intnetinv1 + totalSummaryValue.fixmain1 + totalSummaryValue.engcon1 - totalSummaryValue.other1));

    } else {
        intnetinv2 = (totalSummaryValue.intnetinv1 / totalSummaryValue.yeattotalcost);
        fixmain2 = ((totalSummaryValue.fixmain1 + totalSummaryValue.other1) / totalSummaryValue.yeattotalcost);
        engcon2 = (totalSummaryValue.engcon1 / totalSummaryValue.yeattotalcost);
        other2 = (totalSummaryValue.other1 / totalSummaryValue.yeattotalcost);
    }

    if (count == 1) {
        $("#totalEnergyUserAppleton").val(totalSummaryValue.totalEnergyUsed);
    }
    else {
        $("#totalEnergyUserExisting").eq(countData).val(totalSummaryValue.totalEnergyUsed);
    }


    $(".intnetinv1").eq(count).val(Comma(totalSummaryValue.intnetinv1 > 0 ? (Math.round(totalSummaryValue.intnetinv1)) : 0));
    $(".fixmain1").eq(count).val(Comma((totalSummaryValue.fixmain1 + totalSummaryValue.other1) > 0 ? (Math.round(totalSummaryValue.fixmain1 + totalSummaryValue.other1)) : 0));
    $(".engcon1").eq(count).val(Comma(totalSummaryValue.engcon1 > 0 ? (Math.round(totalSummaryValue.engcon1)) : 0));
    //$(".other1").eq(count).val(Comma(totalSummaryValue.other1 > 0 ? (Math.round(totalSummaryValue.other1 )): 0));
    $(".yeattotalcost").eq(count).val(Comma(totalSummaryValue.yeattotalcost > 0 ? (Math.round(totalSummaryValue.yeattotalcost)) : 0));

    $(".intnetinv2").eq(count).val(intnetinv2 > 0 ? ((Math.round(intnetinv2 * 10000) / 100).toFixed(2) + "%") : 0);
    $(".fixmain2").eq(count).val(fixmain2 > 0 ? ((Math.round(fixmain2 * 10000) / 100).toFixed(2) + "%") : 0);
    $(".engcon2").eq(count).val(engcon2 > 0 ? ((Math.round(engcon2 * 10000) / 100).toFixed(2) + "%") : 0);
    //$(".other2").eq(count).val(other2 > 0 ? ((Math.round(other2 * 10000) / 100).toFixed(2) + "%") : 0);

    fixtureCompleteAction();
}

function changeAppletonLampLife() {
    if ($(".life").eq(1).val() == "0") {
        $(".lifeValApp").show();
    }
    else {
        $(".lifeValApp").val("");
        $(".lifeValApp").hide();
    }
    calculateExistingSummary();
}

function calculateTotalExistingSFixture() {
    $(':input').css("border-color", "");
    $(".warningInfo").hide();
    var configuration = $.cookie("configuration");
    var fixtureValueString = $.cookie("fixtureValue" + configuration);
    var fixtureValueObject = JSON.parse(fixtureValueString);
    var fixture = $.cookie("ficture");
    var intnetinv1 = 0;
    var totalEnergyUsed = 0;
    var fixmain1 = 0;
    var engcon1 = 0;
    var other1 = 0;
    var yeattotalcost = 0;

    var totalSummaryValue = {};
    if (fixtureValueObject != null) {
        if (fixtureValueObject.fictureObject != null) {
            var fixturePlusInstall = 0;
            var incentive = 0;
            var totalRelampCost = 0;
            var totalBallastCost = 0;
            var energyCost = 0;
            var maintenance = 0;
            var quantity = 0;
            var totalCost = 0;
            var lampValue = "";
            var energyused = 0;
            var driverReplacementCost = 0;


            for (var i = 0; i < fixtureValueObject.fictureObject.length; i++) {
                if (configuration == "appleton") {
                    lampValue = fixtureValueObject.fictureObject[i].appletonLeadSeries;
                } else {
                    lampValue = fixtureValueObject.fictureObject[i].lamp;
                }
                if (fixtureValueObject.fictureObject[i] != null && fixtureValueObject.fictureObject[i].fixture != fixture && lampValue != "Select lamp" && lampValue != "Select fixture series") {
                    fixturePlusInstall = fixtureValueObject.fictureObject[i].fixturePlusInstall == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].fixturePlusInstall);
                    incentive = fixtureValueObject.fictureObject[i].incentive == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].incentive);
                    intnetinv1 += (fixturePlusInstall - incentive);

                    var energyUsedPerYear = (fixtureValueObject.fictureObject[i].systemWatt * fixtureValueObject.fictureObject[i].quantity * fixtureValueObject.fictureObject[i].runtime * 365) / 1000;
                    totalEnergyUsed += energyUsedPerYear == undefined ? 0 : parseFloat(energyUsedPerYear);

                    totalRelampCost = fixtureValueObject.fictureObject[i].totalRelampCost == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].totalRelampCost);
                    totalBallastCost = fixtureValueObject.fictureObject[i].totalBallastCost == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].totalBallastCost);

                    engcon1 += fixtureValueObject.fictureObject[i].totalenergycost == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].totalenergycost);

                    maintenance = fixtureValueObject.fictureObject[i].maintenance == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].maintenance);
                    quantity = fixtureValueObject.fictureObject[i].quantity == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].quantity);
                    other1 += (maintenance * quantity);
                    if (configuration == "appleton") {
                        driverReplacementCost = fixtureValueObject.fictureObject[i].driverReplacementCost == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].driverReplacementCost);
                        fixmain1 += (driverReplacementCost);
                    }
                    else {

                        fixmain1 += (totalRelampCost + totalBallastCost);
                    }


                    yeattotalcost += fixtureValueObject.fictureObject[i].totalCost == "" ? 0 : parseFloat(fixtureValueObject.fictureObject[i].totalCost);

                }
            }



        }
    }
    totalSummaryValue.intnetinv1 = intnetinv1;
    totalSummaryValue.fixmain1 = fixmain1;
    totalSummaryValue.totalEnergyUsed = totalEnergyUsed;
    totalSummaryValue.engcon1 = engcon1;
    totalSummaryValue.other1 = other1;
    totalSummaryValue.yeattotalcost = yeattotalcost;

    return totalSummaryValue;
}

function generateChart() {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(createChart);
}

function Comma(Num) { //function to add commas to textboxes
    Num += '';
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Define functin to find and replace specified term with replacement string */
function replaceAll(str, term) {
    if (str != undefined)
        return str.replace(new RegExp(escapeRegExp(term), 'g'), "");
}



function generatePDF() {
    $.get(applicationurl + "/HTML/EmailContent.html", function (dataResult) {
        dataResult = dataResult.replace("{Name}", $(".name").val());
        dataResult = dataResult.replace("{EmailId}", $(".email").val());
        dataResult = dataResult.replace("{CompanyName}", $(".company").val());
        dataResult = dataResult.replace("{PhoneNumber}", $(".phone").val());
        dataResult = dataResult.replace("{ProjectName}", $(".projectName").val());
        dataResult = dataResult.replace("{Application}", $(".application").val());
        dataResult = dataResult.replace("{EnergyCost}", $(".energyRate").val());
        dataResult = dataResult.replace("{TimePeriod}", $(".timeperiod").val());

        dataResult = dataResult.replace("{Existing_IniNetInvest}", $(".existingNetInvestment").val());
        dataResult = dataResult.replace("{Existing_IniNetInvestPercentage}", $(".existingNetInvestmentPercentage").val());
        dataResult = dataResult.replace("{Appleton_IniNetInvest}", $(".appletonNetInvestment").val());
        dataResult = dataResult.replace("{Appleton_IniNetInvestPercentage}", $(".appletonNetInvestmentPercentage").val());
        dataResult = dataResult.replace("{Proposed_IniNetInvest}", $(".proposalNetInvestment").val());
        dataResult = dataResult.replace("{Proposed_IniNetInvestPercentage}", $(".proposalNetInvestmentPercentage").val());

        dataResult = dataResult.replace("{Existing_FixtureMaintenance}", $(".existingFixtureMaintenance").val());
        dataResult = dataResult.replace("{Existing_FixtureMaintenancePercentage}", $(".existingFixtureMaintenancePercentage").val());
        dataResult = dataResult.replace("{Appleton_FixtureMaintenance}", $(".appletonFixtureMaintenance").val());
        dataResult = dataResult.replace("{Appleton_FixtureMaintenancePercentage}", $(".appletonFixtureMaintenancePercentage").val());
        dataResult = dataResult.replace("{Proposed_FixtureMaintenance}", $(".proposalFixtureMaintenance").val());
        dataResult = dataResult.replace("{Proposed_FixtureMaintenancePercentage}", $(".proposalFixtureMaintenancePercentage").val());

        dataResult = dataResult.replace("{Existing_EnergyConsumed}", $(".existingEnergyConsumed").val());
        dataResult = dataResult.replace("{Existing_EnergyConsumedPercentage}", $(".existingEnergyConsumedPercentage").val());
        dataResult = dataResult.replace("{Appleton_EnergyConsumed}", $(".appletonEnergyConsumed").val());
        dataResult = dataResult.replace("{Appleton_EnergyConsumedPercentage}", $(".appletonEnergyConsumedPercentage").val());
        dataResult = dataResult.replace("{Proposed_EnergyConsumed}", $(".proposalEnergyConsumed").val());
        dataResult = dataResult.replace("{Proposed_EnergyConsumedPercentage}", $(".proposalEnergyConsumedPercentage").val());


        dataResult = dataResult.replace("{Existing_Other}", $(".existingOtherCost").val());
        dataResult = dataResult.replace("{Existing_OtherPercentage}", $(".existingOtherCostPercentage").val());
        dataResult = dataResult.replace("{Appleton_Other}", $(".appletonOtherCost").val());
        dataResult = dataResult.replace("{Appleton_OtherPercentage}", $(".appletonOtherCostPercentage").val());
        dataResult = dataResult.replace("{Proposed_Other}", $(".proposalOtherCost").val());
        dataResult = dataResult.replace("{Proposed_OtherPercentage}", $(".proposalOtherCostPercentage").val());

        dataResult = dataResult.replace("{Existing_TotalCost}", $(".existingTotalFixyureSummaryCost").val());
        dataResult = dataResult.replace("{Appleton_TotalCost}", $(".appletonTotalFixyureSummaryCost").val());
        dataResult = dataResult.replace("{Proposed_TotalCost}", $(".proposalTotalFixyureSummaryCost").val());

        dataResult = dataResult.replace("{Appleton_SavingsoverExisting}", $(".savingOverExisting").val());
        dataResult = dataResult.replace("{Proposed_SavingsoverExisting}", $(".savingOverExisting2").val());

        dataResult = dataResult.replace("{Appleton_AvgYearlySavings}", $(".avgYearlySaving").val());
        dataResult = dataResult.replace("{Proposed_AvgYearlySavings}", $(".avgYearlySaving2").val());

        dataResult = dataResult.replace("{Appleton_PaybackPeriods}", $(".paybackPeriod").val());
        dataResult = dataResult.replace("{Proposed_PaybackPeriods}", $(".paybackPeriod2").val());

        $(".emailContent").html(dataResult);

        var specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '.no-export': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true;
            }
        };



        var doc = new jsPDF('l', 'pt', 'a3');
        //A4 - 595x842 pts
        //https://www.gnu.org/software/gv/manual/html_node/Paper-Keywords-and-paper-size-in-points.html


        //Html source
        var source = document.getElementById('content').innerHTML;

        var margins = {
            top: 10,
            bottom: 10,
            left: 10,
            width: 800
        };

        doc.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left,
            margins.top, {
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                doc.save('AppletonLightSavingsCalculator.pdf');
            }, margins);
    });
}


function createChart() {


    var configuration = $.cookie("configuration");
    var fixtureValueString = $.cookie("fixtureValueexisting");
    var fixtureValueObjectExisting = JSON.parse(fixtureValueString);
    fixtureValueString = $.cookie("fixtureValueappleton");
    var fixtureValueObjectAppleton = JSON.parse(fixtureValueString);
    fixtureValueString = $.cookie("fixtureValueproposal");
    var fixtureValueObjectProposal = JSON.parse(fixtureValueString);

    var dataHeaderArray = ["Genre", "Initial Net Investment", "Maintenance Costs", "Energy Costs", {
        role: 'annotation'
    }];
    var costbreakdownPercentage = [];
    var costbreakdownTotal = [];
    costbreakdownPercentage.push(dataHeaderArray);
    costbreakdownTotal.push(dataHeaderArray);

    if (fixtureValueObjectExisting != null) {

        if (fixtureValueObjectExisting.totalInitialNetInvestment != null) {

            var totalInitialNetInvestment = Math.round(fixtureValueObjectExisting.totalInitialNetInvestment);
            var totalFixtureMaintenance = Math.round(fixtureValueObjectExisting.totalFixtureMaintenance);
            var totalEnergyConsumed = Math.round(fixtureValueObjectExisting.totalEnergyConsumed);
            var totalOtherCost = Math.round(fixtureValueObjectExisting.totalOtherCost);
            var totalExistingFixtureCost = Math.round(fixtureValueObjectExisting.totalExistingFixtureCost);
            var totalInitialNetInvestmentPercentage = Math.round(fixtureValueObjectExisting.totalInitialNetInvestmentPercentage);
            var totalFixtureMaintenancePercentage = Math.round(fixtureValueObjectExisting.totalFixtureMaintenancePercentage);
            var totalEnergyConsumedPercentage = Math.round(fixtureValueObjectExisting.totalEnergyConsumedPercentage);
            var totalOtherCostPercentage = Math.round(fixtureValueObjectExisting.totalOtherCostPercentage);
            var existingArray = ["Existing", totalInitialNetInvestmentPercentage, totalFixtureMaintenancePercentage, totalEnergyConsumedPercentage, totalOtherCostPercentage, ""];
            var existingArrayTotal = ["Existing", totalInitialNetInvestment, totalFixtureMaintenance, totalEnergyConsumed, ""];
            costbreakdownPercentage.push(existingArray);
            costbreakdownTotal.push(existingArrayTotal);
        } else {
            var existingArray = ["Existing", 0, 0, 0, ""];
            var existingArrayTotal = ["Existing", 0, 0, 0, ""];
            costbreakdownPercentage.push(existingArray);
            costbreakdownTotal.push(existingArrayTotal);
        }
    } else {
        var existingArray = ["Existing", 0, 0, 0, ""];
        var existingArrayTotal = ["Existing", 0, 0, 0, ""];
        costbreakdownPercentage.push(existingArray);
        costbreakdownTotal.push(existingArrayTotal);
    }

    if (fixtureValueObjectAppleton != null) {
        if (fixtureValueObjectAppleton.totalInitialNetInvestment != null) {
            var totalInitialNetInvestment = Math.round(fixtureValueObjectAppleton.totalInitialNetInvestment);
            var totalFixtureMaintenance = Math.round(fixtureValueObjectAppleton.totalFixtureMaintenance);
            var totalEnergyConsumed = Math.round(fixtureValueObjectAppleton.totalEnergyConsumed);
            var totalOtherCost = Math.round(fixtureValueObjectAppleton.totalOtherCost);
            var totalExistingFixtureCost = Math.round(fixtureValueObjectAppleton.totalExistingFixtureCost);
            var totalInitialNetInvestmentPercentage = Math.round(fixtureValueObjectAppleton.totalInitialNetInvestmentPercentage);
            var totalFixtureMaintenancePercentage = Math.round(fixtureValueObjectAppleton.totalFixtureMaintenancePercentage);
            var totalEnergyConsumedPercentage = Math.round(fixtureValueObjectAppleton.totalEnergyConsumedPercentage);
            var totalOtherCostPercentage = Math.round(fixtureValueObjectAppleton.totalOtherCostPercentage);
            var appletonArray = ["Appleton", totalInitialNetInvestmentPercentage, totalFixtureMaintenancePercentage, totalEnergyConsumedPercentage, totalOtherCostPercentage, ""];
            var appletonArrayTotal = ["Appleton", totalInitialNetInvestment, totalFixtureMaintenance, totalEnergyConsumed, ""];
            costbreakdownPercentage.push(appletonArray);
            costbreakdownTotal.push(appletonArrayTotal);
        } else {
            var appletonArray = ["Appleton", 0, 0, 0, ""];
            var appletonArrayTotal = ["Appleton", 0, 0, 0, ""];
            costbreakdownPercentage.push(appletonArray);
            costbreakdownTotal.push(appletonArrayTotal);
        }
    } else {
        var appletonArray = ["Appleton", 0, 0, 0, ""];
        var appletonArrayTotal = ["Appleton", 0, 0, 0, ""];
        costbreakdownPercentage.push(appletonArray);
        costbreakdownTotal.push(appletonArrayTotal);
    }

    if (fixtureValueObjectProposal != null) {
        if (fixtureValueObjectProposal.totalInitialNetInvestment != null) {
            var totalInitialNetInvestment = Math.round(fixtureValueObjectProposal.totalInitialNetInvestment);
            var totalFixtureMaintenance = Math.round(fixtureValueObjectProposal.totalFixtureMaintenance);
            var totalEnergyConsumed = Math.round(fixtureValueObjectProposal.totalEnergyConsumed);
            var totalOtherCost = Math.round(fixtureValueObjectProposal.totalOtherCost);
            var totalExistingFixtureCost = Math.round(fixtureValueObjectProposal.totalExistingFixtureCost);
            var totalInitialNetInvestmentPercentage = Math.round(fixtureValueObjectProposal.totalInitialNetInvestmentPercentage);
            var totalFixtureMaintenancePercentage = Math.round(fixtureValueObjectProposal.totalFixtureMaintenancePercentage);
            var totalEnergyConsumedPercentage = Math.round(fixtureValueObjectProposal.totalEnergyConsumedPercentage);
            var totalOtherCostPercentage = Math.round(fixtureValueObjectProposal.totalOtherCostPercentage);
            var proposalArray = [$('#alternate').text(), totalInitialNetInvestmentPercentage, totalFixtureMaintenancePercentage, totalEnergyConsumedPercentage, totalOtherCostPercentage, ""];
            var proposalArrayTotal = [$('#alternate').text(), totalInitialNetInvestment, totalFixtureMaintenance, totalEnergyConsumed, ""];
            costbreakdownPercentage.push(proposalArray);
            if ($(".showProposal").css("display") != "none") {
                costbreakdownTotal.push(proposalArrayTotal);
            }

        } else {
            var proposalArray = [$('#alternate').text(), 0, 0, 0, ""];
            var proposalArrayTotal = [$('#alternate').text(), 0, 0, 0, ""];
            costbreakdownPercentage.push(proposalArray);
            if ($(".showProposal").css("display") != "none") {
                costbreakdownTotal.push(proposalArrayTotal);
            }

        }
    } else {
        var proposalArray = [$('#alternate').text(), 0, 0, 0, ""];
        var proposalArrayTotal = [$('#alternate').text(), 0, 0, 0, ""];
        costbreakdownPercentage.push(proposalArray);
        if ($(".showProposal").css("display") != "none") {
            costbreakdownTotal.push(proposalArrayTotal);
        }

    }
    var costbreakdownPercentageData = google.visualization.arrayToDataTable(costbreakdownTotal);
    var costbreakdownTotalData = google.visualization.arrayToDataTable(costbreakdownTotal);


    var options = {
        title: 'Cost Break-Out (% of Total)',
        width: 400,
        height: 300,
        legend: {
            position: 'top',
            maxLines: 3
        },
        bar: {
            groupWidth: '75%'
        },
        isStacked: 'percent'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("costBreakoutPercentage"));

    chart.draw(costbreakdownPercentageData, options);
    options = {
        title: 'Total Cost Break-Out & Savings',
        width: 400,
        height: 300,
        legend: {
            position: 'top',
            maxLines: 3
        },
        bar: {
            groupWidth: '75%'
        },
        isStacked: true,
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("costBreakoutTotal"));
    chart.draw(costbreakdownTotalData, options);
}


function getTotalExistingFixturesData() {
    setCurrentCaculationCookie();
    var configuration = $.cookie("configuration");
    var fixtureValueString = $.cookie("fixtureValueexisting");
    var fixtureValueObjectExisting = JSON.parse(fixtureValueString);
    fixtureValueString = $.cookie("fixtureValueappleton");
    var fixtureValueObjectAppleton = JSON.parse(fixtureValueString);
    fixtureValueString = $.cookie("fixtureValueproposal");
    var fixtureValueObjectProposal = JSON.parse(fixtureValueString);

    var currencyValue = $('.ddlcurrency').val();
    currencyValue = currencyValue.split("-")[0];
    if (fixtureValueObjectExisting != null) {
        if (fixtureValueObjectExisting.totalInitialNetInvestment != null) {
            if (currencyValue != "BHD (.د.ب)") {
                $(".existingNetInvestment").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectExisting.totalInitialNetInvestment)))));
                $(".existingFixtureMaintenance").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectExisting.totalFixtureMaintenance)))));
                $(".existingEnergyConsumed").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectExisting.totalEnergyConsumed)))));
                $(".existingOtherCost").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectExisting.totalOtherCost)))));
                $(".existingTotalFixyureSummaryCost").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectExisting.totalExistingFixtureCost)))));
            } else {
                $(".existingNetInvestment").val((Comma(Math.round((fixtureValueObjectExisting.totalInitialNetInvestment)))) + " " + currencyValue);
                $(".existingFixtureMaintenance").val((Comma((Math.round(fixtureValueObjectExisting.totalFixtureMaintenance)))) + " " + currencyValue);
                $(".existingEnergyConsumed").val((Comma(Math.round((fixtureValueObjectExisting.totalEnergyConsumed)))) + " " + currencyValue);
                $(".existingOtherCost").val((Comma(Math.round((fixtureValueObjectExisting.totalOtherCost)))) + " " + currencyValue);
                $(".existingTotalFixyureSummaryCost").val((Comma((Math.round(fixtureValueObjectExisting.totalExistingFixtureCost)))) + " " + currencyValue);
            }

            $(".existingNetInvestmentPercentage").val((Math.round(fixtureValueObjectExisting.totalInitialNetInvestmentPercentage)) + "%");
            $(".existingFixtureMaintenancePercentage").val((Math.round(fixtureValueObjectExisting.totalFixtureMaintenancePercentage)) + "%");
            $(".existingEnergyConsumedPercentage").val((Math.round(fixtureValueObjectExisting.totalEnergyConsumedPercentage)) + "%");
            $(".existingOtherCostPercentage").val((Math.round(fixtureValueObjectExisting.totalOtherCostPercentage)) + "%");
        }
    } else {
        $(".existingNetInvestment").val(0);
        $(".existingFixtureMaintenance").val(0);
        $(".existingEnergyConsumed").val(0);
        $(".existingOtherCost").val(0);
        $(".existingTotalFixyureSummaryCost").val(0);
        $(".existingNetInvestmentPercentage").val(0 + "%");
        $(".existingFixtureMaintenancePercentage").val(0 + "%");
        $(".existingEnergyConsumedPercentage").val(0 + "%");
        $(".existingOtherCostPercentage").val(0 + "%");
    }

    if (fixtureValueObjectAppleton != null) {
        if (fixtureValueObjectAppleton.totalInitialNetInvestment != null) {
            if (currencyValue != "BHD (.د.ب)") {
                $(".appletonNetInvestment").val((currencyValue + " ") + (Comma((Math.round(fixtureValueObjectAppleton.totalInitialNetInvestment)))));
                $(".appletonFixtureMaintenance").val((currencyValue + " ") + (Comma((Math.round(fixtureValueObjectAppleton.totalFixtureMaintenance)))));
                $(".appletonEnergyConsumed").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectAppleton.totalEnergyConsumed)))));
                $(".appletonOtherCost").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectAppleton.totalOtherCost)))));
                $(".appletonTotalFixyureSummaryCost").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectAppleton.totalExistingFixtureCost)))));
            } else {
                $(".appletonNetInvestment").val((Comma((Math.round(fixtureValueObjectAppleton.totalInitialNetInvestment)))) + " " + currencyValue);
                $(".appletonFixtureMaintenance").val((Comma((Math.round(fixtureValueObjectAppleton.totalFixtureMaintenance)))) + " " + currencyValue);
                $(".appletonEnergyConsumed").val((Comma((Math.round(fixtureValueObjectAppleton.totalEnergyConsumed)))) + " " + currencyValue);
                $(".appletonOtherCost").val((Comma((Math.round(fixtureValueObjectAppleton.totalOtherCost)))) + " " + currencyValue);
                $(".appletonTotalFixyureSummaryCost").val((Comma((Math.round(fixtureValueObjectAppleton.totalExistingFixtureCost)))) + " " + currencyValue);
            }

            $(".appletonNetInvestmentPercentage").val((Math.round(fixtureValueObjectAppleton.totalInitialNetInvestmentPercentage)) + "%");
            $(".appletonFixtureMaintenancePercentage").val((Math.round(fixtureValueObjectAppleton.totalFixtureMaintenancePercentage)) + "%");
            $(".appletonEnergyConsumedPercentage").val((Math.round(fixtureValueObjectAppleton.totalEnergyConsumedPercentage)) + "%");
            $(".appletonOtherCostPercentage").val((Math.round(fixtureValueObjectAppleton.totalOtherCostPercentage)) + "%");
        }
    } else {
        $(".appletonNetInvestment").val(0);
        $(".appletonFixtureMaintenance").val(0);
        $(".appletonEnergyConsumed").val(0);
        $(".appletonOtherCost").val(0);
        $(".appletonTotalFixyureSummaryCost").val(0);
        $(".appletonNetInvestmentPercentage").val(0 + "%");
        $(".appletonFixtureMaintenancePercentage").val(0 + "%");
        $(".appletonEnergyConsumedPercentage").val(0 + "%");
        $(".appletonOtherCostPercentage").val(0 + "%");
    }

    if (fixtureValueObjectProposal != null) {
        if (fixtureValueObjectProposal.totalInitialNetInvestment != null) {
            if (currencyValue != "BHD (.د.ب)") {
                $(".proposalNetInvestment").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectProposal.totalInitialNetInvestment)))));
                $(".proposalFixtureMaintenance").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectProposal.totalFixtureMaintenance)))));
                $(".proposalEnergyConsumed").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectProposal.totalEnergyConsumed)))));
                $(".proposalOtherCost").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectProposal.totalOtherCost)))));
                $(".proposalTotalFixyureSummaryCost").val(currencyValue + " " + (Comma((Math.round(fixtureValueObjectProposal.totalExistingFixtureCost)))));
            } else {

                $(".proposalNetInvestment").val((Comma((Math.round(fixtureValueObjectProposal.totalInitialNetInvestment)))) + " " + currencyValue);
                $(".proposalFixtureMaintenance").val((Comma((Math.round(fixtureValueObjectProposal.totalFixtureMaintenance)))) + " " + currencyValue);
                $(".proposalEnergyConsumed").val((Comma((Math.round(fixtureValueObjectProposal.totalEnergyConsumed)))) + " " + currencyValue);
                $(".proposalOtherCost").val((Comma((Math.round(fixtureValueObjectProposal.totalOtherCost)))) + " " + currencyValue);
                $(".proposalTotalFixyureSummaryCost").val((Comma((Math.round(fixtureValueObjectProposal.totalExistingFixtureCost)))) + " " + currencyValue);
            }
            $(".proposalNetInvestmentPercentage").val((Math.round(fixtureValueObjectProposal.totalInitialNetInvestmentPercentage)) + "%");
            $(".proposalFixtureMaintenancePercentage").val((Math.round(fixtureValueObjectProposal.totalFixtureMaintenancePercentage)) + "%");
            $(".proposalEnergyConsumedPercentage").val((Math.round(fixtureValueObjectProposal.totalEnergyConsumedPercentage)) + "%");
            $(".proposalOtherCostPercentage").val((Math.round(fixtureValueObjectProposal.totalOtherCostPercentage)) + "%");
        }
    } else {
        $(".proposalNetInvestment").val(0);
        $(".proposalFixtureMaintenance").val(0);
        $(".proposalEnergyConsumed").val(0);
        $(".proposalOtherCost").val(0);
        $(".proposalTotalFixyureSummaryCost").val(0);
        $(".proposalNetInvestmentPercentage").val(0 + "%");
        $(".proposalFixtureMaintenancePercentage").val(0 + "%");
        $(".proposalEnergyConsumedPercentage").val(0 + "%");
        $(".proposalOtherCostPercentage").val(0 + "%");
    }

    var userString = $.cookie("User");
    var totalYear;
    if (userString != null) {
        var user = JSON.parse(userString);
        totalYear = parseInt(user.timeperiod);
    }

    //For Proposal A
    var netInvestment_ProposalA = 0;
    var totalFixtureMaintenanceSaving_ProposalA = 0;
    var totalEnergySaving_ProposalA = 0;
    var otherCostSaving_ProposalA = 0;
    var yearlySaving_ProposalA = 0;
    var totalPayback_ProposalA = 0;

    if (fixtureValueObjectExisting != null && fixtureValueObjectAppleton != null) {
        netInvestment_ProposalA = ((Math.round(fixtureValueObjectAppleton.totalInitialNetInvestment)) - (Math.round(fixtureValueObjectExisting.totalInitialNetInvestment)));
        totalFixtureMaintenanceSaving_ProposalA = ((Math.round(fixtureValueObjectExisting.totalFixtureMaintenance)) - (Math.round(fixtureValueObjectAppleton.totalFixtureMaintenance)));
        totalEnergySaving_ProposalA = ((Math.round(fixtureValueObjectExisting.totalEnergyConsumed)) - (Math.round(fixtureValueObjectAppleton.totalEnergyConsumed)));
        otherCostSaving_ProposalA = ((Math.round(fixtureValueObjectExisting.totalOtherCost)) - (Math.round(fixtureValueObjectAppleton.totalOtherCost)));
        yearlySaving_ProposalA = (totalFixtureMaintenanceSaving_ProposalA + totalEnergySaving_ProposalA + otherCostSaving_ProposalA) / totalYear;
        totalPayback_ProposalA = isNaN(netInvestment_ProposalA / yearlySaving_ProposalA) ? 0 : (netInvestment_ProposalA / yearlySaving_ProposalA);
    }


    //For Proposal B
    var netInvestment_ProposalB = 0;
    var totalFixtureMaintenanceSaving_ProposalB = 0;
    var totalEnergySaving_ProposalB = 0;
    var otherCostSaving_ProposalB = 0;
    var yearlySaving_ProposalB = 0;
    var totalPayback_ProposalB = 0;

    if (fixtureValueObjectExisting != null && fixtureValueObjectProposal != null) {
        netInvestment_ProposalB = ((Math.round(fixtureValueObjectProposal.totalInitialNetInvestment)) - (Math.round(fixtureValueObjectExisting.totalInitialNetInvestment)));
        totalFixtureMaintenanceSaving_ProposalB = ((Math.round(fixtureValueObjectExisting.totalFixtureMaintenance)) - (Math.round(fixtureValueObjectProposal.totalFixtureMaintenance)));
        totalEnergySaving_ProposalB = ((Math.round(fixtureValueObjectExisting.totalEnergyConsumed)) - (Math.round(fixtureValueObjectProposal.totalEnergyConsumed)));
        otherCostSaving_ProposalB = ((Math.round(fixtureValueObjectExisting.totalOtherCost)) - (Math.round(fixtureValueObjectProposal.totalOtherCost)));
        yearlySaving_ProposalB = (totalFixtureMaintenanceSaving_ProposalB + totalEnergySaving_ProposalB + otherCostSaving_ProposalB) / totalYear;
        totalPayback_ProposalB = isNaN(netInvestment_ProposalB / yearlySaving_ProposalB) ? 0 : (netInvestment_ProposalB / yearlySaving_ProposalB);
    }

    //Comma((Math.round(fixtureValueObjectExisting.totalExistingFixtureCost)))

    var savingOverExisting_ProposalA = (totalFixtureMaintenanceSaving_ProposalA + totalEnergySaving_ProposalA + otherCostSaving_ProposalA) < 0 ? "NA" : (Math.round((totalFixtureMaintenanceSaving_ProposalA + totalEnergySaving_ProposalA + otherCostSaving_ProposalA)));
    var savingOverExisting_ProposalB = (totalFixtureMaintenanceSaving_ProposalB + totalEnergySaving_ProposalB + otherCostSaving_ProposalB) < 0 ? "NA" : (Math.round((totalFixtureMaintenanceSaving_ProposalB + totalEnergySaving_ProposalB + otherCostSaving_ProposalB)));

    var NetInvest_ProposalA = (Math.round(fixtureValueObjectExisting.totalExistingFixtureCost - fixtureValueObjectAppleton.totalExistingFixtureCost));
    var NetInvest_ProposalB = (Math.round(fixtureValueObjectExisting.totalExistingFixtureCost - fixtureValueObjectProposal.totalExistingFixtureCost));

    var initNetInvest_ProposalA = NetInvest_ProposalA < 0 ? "NA" : (Math.round(NetInvest_ProposalA));
    var initNetInvest_ProposalB = NetInvest_ProposalB < 0 ? "NA" : (Math.round(NetInvest_ProposalB));

    var ROI_ProposalA = initNetInvest_ProposalA == "NA" ? "NA" : (fixtureValueObjectAppleton.totalInitialNetInvestment != 0 ? ((NetInvest_ProposalA / fixtureValueObjectAppleton.totalInitialNetInvestment) * 100) : "NA");
    var ROI_ProposalB = initNetInvest_ProposalB == "NA" ? "NA" : (fixtureValueObjectProposal.totalInitialNetInvestment != 0 ? ((NetInvest_ProposalB / fixtureValueObjectProposal.totalInitialNetInvestment) * 100) : "NA");


    //var averageYearlySaving_ProposalA = yearlySaving_ProposalA < 0 ? "NA" : (Math.round(yearlySaving_ProposalA ));
    //var averageYearlySaving_ProposalB = yearlySaving_ProposalB < 0 ? "NA" : (Math.round(yearlySaving_ProposalB ));

    var averageYearlySaving_ProposalA = initNetInvest_ProposalA == "NA" ? "NA" : ((initNetInvest_ProposalA / totalYear) < 0 ? "NA" : (Math.round(initNetInvest_ProposalA / totalYear)));
    var averageYearlySaving_ProposalB = initNetInvest_ProposalB == "NA" ? "NA" : ((initNetInvest_ProposalB / totalYear) < 0 ? "NA" : (Math.round((initNetInvest_ProposalB / totalYear))));

    totalPayback_ProposalA = fixtureValueObjectAppleton.totalInitialNetInvestment != 0 ? (fixtureValueObjectAppleton.totalInitialNetInvestment / (initNetInvest_ProposalA / totalYear)) : 0;//isNaN(netInvestment_ProposalA / (initNetInvest_ProposalA / totalYear)) ? 0 : (netInvestment_ProposalA / (initNetInvest_ProposalA / totalYear));
    totalPayback_ProposalB = fixtureValueObjectProposal.totalInitialNetInvestment != 0 ? (fixtureValueObjectProposal.totalInitialNetInvestment / (initNetInvest_ProposalB / totalYear)) : 0;//isNaN(netInvestment_ProposalB / (initNetInvest_ProposalB / totalYear)) ? 0 : (netInvestment_ProposalB / (initNetInvest_ProposalB / totalYear));

    var averagePayback_ProposalA = initNetInvest_ProposalA == "NA" ? "NA" : (totalPayback_ProposalA < 0 ? "NA" : (Math.round(totalPayback_ProposalA * 10) / 10));
    var averagePayback_ProposalB = initNetInvest_ProposalB == "NA" ? "NA" : (totalPayback_ProposalB < 0 ? "NA" : (Math.round(totalPayback_ProposalB * 10) / 10));
    if (currencyValue != ".د.ب") {

		/*$(".savingOverExisting").val((savingOverExisting_ProposalA != "NA" ? currencyValue : "") + " " + (savingOverExisting_ProposalA != "NA" ? Comma((savingOverExisting_ProposalA) ) : Comma((savingOverExisting_ProposalA))) );
        $(".savingOverExisting2").val((savingOverExisting_ProposalB != "NA" ? currencyValue : "") + " " + (savingOverExisting_ProposalB != "NA" ? Comma((savingOverExisting_ProposalB) ) : Comma((savingOverExisting_ProposalB) )) );
		
		$(".initNetInvest").val((initNetInvest_ProposalA != "NA" ? currencyValue : "") + " " + (initNetInvest_ProposalA != "NA" ? Comma((initNetInvest_ProposalA)) : Comma((initNetInvest_ProposalA)))  );
        $(".initNetInvest2").val((initNetInvest_ProposalB != "NA" ? currencyValue : "") + " " + (initNetInvest_ProposalB != "NA" ? Comma((initNetInvest_ProposalB) ) : Comma((initNetInvest_ProposalB) )) );*/

        $(".savingOverExisting").val((initNetInvest_ProposalA != "NA" ? currencyValue : "") + " " + (initNetInvest_ProposalA != "NA" ? Comma((initNetInvest_ProposalA)) : Comma((initNetInvest_ProposalA))));
        $(".savingOverExisting2").val((initNetInvest_ProposalB != "NA" ? currencyValue : "") + " " + (initNetInvest_ProposalB != "NA" ? Comma((initNetInvest_ProposalB)) : Comma((initNetInvest_ProposalB))));

        $(".initNetInvest").val($(".appletonNetInvestment").val());
        $(".initNetInvest2").val($(".proposalNetInvestment").val());

        $(".ROI").val(ROI_ProposalA == "NA" ? "NA" : (Math.round(ROI_ProposalA) + "%"));
        $(".ROI2").val(ROI_ProposalB == "NA" ? "NA" : (Math.round(ROI_ProposalB) + "%"));



        $(".avgYearlySaving").val((averageYearlySaving_ProposalA != "NA" ? currencyValue : "") + " " + (averageYearlySaving_ProposalA != "NA" ? Comma((averageYearlySaving_ProposalA)) : Comma((averageYearlySaving_ProposalA))));
        $(".avgYearlySaving2").val((averageYearlySaving_ProposalB != "NA" ? currencyValue : "") + " " + (averageYearlySaving_ProposalB != "NA" ? Comma((averageYearlySaving_ProposalB)) : Comma((averageYearlySaving_ProposalB))));

        $(".paybackPeriod").val((averagePayback_ProposalA != "NA" ? Comma((averagePayback_ProposalA)) : Comma((averagePayback_ProposalA))));
        $(".paybackPeriod2").val((averagePayback_ProposalB != "NA" ? Comma((averagePayback_ProposalB)) : Comma((averagePayback_ProposalB))));
    } else {
        $(".savingOverExisting").val((savingOverExisting_ProposalA != "NA" ? Comma((savingOverExisting_ProposalA)) : Comma((savingOverExisting_ProposalA))) + " " + (savingOverExisting_ProposalA != "NA" ? currencyValue : ""));
        $(".savingOverExisting2").val((savingOverExisting_ProposalB != "NA" ? Comma((savingOverExisting_ProposalB)) : Comma((savingOverExisting_ProposalB))) + " " + (savingOverExisting_ProposalB != "NA" ? currencyValue : ""));

        $(".avgYearlySaving").val((averageYearlySaving_ProposalA != "NA" ? Comma((averageYearlySaving_ProposalA)) : Comma((averageYearlySaving_ProposalA))) + " " + (averageYearlySaving_ProposalA != "NA" ? currencyValue : ""));
        $(".avgYearlySaving2").val((averageYearlySaving_ProposalB != "NA" ? Comma((averageYearlySaving_ProposalB)) : Comma((averageYearlySaving_ProposalB))) + " " + (averageYearlySaving_ProposalB != "NA" ? currencyValue : ""));

        $(".paybackPeriod").val((averagePayback_ProposalA != "NA" ? Comma((averagePayback_ProposalA)) : Comma((averagePayback_ProposalA))));
        $(".paybackPeriod2").val((averagePayback_ProposalB != "NA" ? Comma((averagePayback_ProposalB)) : Comma((averagePayback_ProposalB))));
    }


    generateChart();
    calculateEnvironmentImpact();




}

function validateRequiredFields() {
    var isValid = true;
    var configuration = $.cookie("configuration");
    var fixture = $.cookie("ficture");
    var count = 0;
    var countData = 0;
    if (configuration == "existing") {
        count = 0;
        countData = 0;
    } else if (configuration == "appleton") {
        count = 1;
    } else if (configuration == "proposal") {
        count = 2;
        countData = 1;
    }
    var lampType = "";
    if (count == 1) {
        var ddlSeriesVal = $('#ddlLedSeries').data('ddslick');
        lampType = ddlSeriesVal.selectedData.text;
        if (lampType == "Select fixture series") {
            lampType = "Select lamp";
        }
    } else {
        lampType = $(".lamp").eq(countData).val();
    }
    var containerId = "";
    if (configuration != "proposal") {
        containerId = configuration + "Configuration";
    } else {
        containerId = configuration;
    }

    if (lampType != "Select lamp") {
        for (var i = $("#" + containerId + " .required").length - 1; i >= 0; i--) {
            if ($("#" + containerId + " .required").eq(i).val().length == 0) {
                $("#" + containerId + " .required").eq(i).focus();
                $("#" + containerId + " .required").eq(i).css("border-color", "red");
                $("#" + containerId + " .warningInfo").eq(i).show();
                isValid = false;
            }
        }

        var fictureInfo = $.cookie("fictureInfo");
        if (fictureInfo != null) {
            var fixtureDetails = JSON.parse(fictureInfo);
            if (fixtureDetails != null) {
                isFixtureAvailable = false;
                isConfigurationAvailable = false;
                for (var i = 0; i < fixtureDetails.length; i++) {
                    if (fixtureDetails[i].configuration == configuration) {
                        isConfigurationAvailable = true;
                        if (fixtureDetails[i].fixtureName.length > 0) {
                            for (var j = 0; j < fixtureDetails[i].fixtureName.length; j++) {
                                if (fixtureDetails[i].fixtureName[j] == fixture) {
                                    isFixtureAvailable = true;
                                }
                            }
                            if (!isFixtureAvailable) {
                                if (isValid) {
                                    fixtureDetails[i].fixtureName.push(fixture);
                                }
                            }
                        } else {
                            if (isValid) {
                                fixtureDetails[i].fixtureName.push(fixture);
                            }
                        }
                    }

                }
                if (!isConfigurationAvailable) {
                    var fictureDetail = {};
                    fictureDetail.configuration = configuration;
                    var fixtureNameArray = [];
                    fixtureNameArray.push(fixture);
                    fictureDetail.fixtureName = fixtureNameArray;
                    fixtureDetails.push(fictureDetail);
                }
                $.cookie("fictureInfo", JSON.stringify(fixtureDetails));

            }

        } else {
            var fixtureDetailInfo = [];
            var fictureDetail = {};
            fictureDetail.configuration = configuration;
            var fixtureNameArray = [];
            fixtureNameArray.push(fixture);
            fictureDetail.fixtureName = fixtureNameArray;
            fixtureDetailInfo.push(fictureDetail);
            $.cookie("fictureInfo", JSON.stringify(fixtureDetailInfo));
        }
    } else {
        var fictureInfo = $.cookie("fictureInfo");
        if (fictureInfo != null) {
            var fixtureDetails = JSON.parse(fictureInfo);
            if (fixtureDetails != null) {
                for (var i = 0; i < fixtureDetails.length; i++) {
                    if (fixtureDetails[i].configuration == configuration) {
                        if (fixtureDetails[i].fixtureName.length > 0) {
                            for (var j = 0; j < fixtureDetails[i].fixtureName.length; j++) {
                                if (fixtureDetails[i].fixtureName[j] == fixture) {
                                    fixtureDetails[i].fixtureName.pop(fixture);
                                }
                            }
                        }
                    }

                }
                $.cookie("fictureInfo", JSON.stringify(fixtureDetails));
            }

        }
    }
    return isValid;
}

function fixtureCompleteAction() {
    var configuration = $.cookie("configuration");
    var fixtureInfo = $.cookie("fictureInfo");
    var count = 0;
    var countData = 0;
    if (configuration == "existing") {
        count = 0;
    } else if (configuration == "appleton") {
        count = 1;
    } else if (configuration == "proposal") {
        count = 2;
    }

    var fixtureDetails = JSON.parse(fixtureInfo);
    if (fixtureDetails != null) {
        for (var i = 0; i < fixtureDetails.length; i++) {
            if (fixtureDetails[i].configuration == configuration) {
                if (fixtureDetails[i].fixtureName.length > 0) {
                    for (var j = 0; j < fixtureDetails[i].fixtureName.length; j++) {
                        var node = fixtureDetails[i].fixtureName[j].substr(fixtureDetails[i].fixtureName[j].length - 1);
                        $(".btnNext" + node).eq(count).css({
                            "border-left-width": "thick",
                            "border-left-color": "red"
                        });
                    }
                }
            }

        }
    }

}

function sendEmail(emailFrom, emailToArray, emailBody, emailSubject) {
    var mail = {
        properties: {
            __metadata: {
                'type': 'SP.Utilities.EmailProperties'
            },
            From: emailFrom,
            To: {
                'results': emailToArray
            },
            Body: emailBody,
            Subject: emailSubject
        }
    };

    var getAppWebUrlUrl = window.location.protocol + '//' + window.location.host;
    var urlTemplate = getAppWebUrlUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify(mail),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {

            // code

        },

        error: function (err) {

            // code

        }
    });
}

function calculateEnvironmentImpact() {
    var fixtureValueString = $.cookie("fixtureValueappleton");
    var fixtureAppletonValueObject = JSON.parse(fixtureValueString);

    fixtureValueString = $.cookie("fixtureValueexisting");
    var fixtureExistingValueObject = JSON.parse(fixtureValueString);

    var energySaved = Math.round(fixtureExistingValueObject.totalEnergyUsed - fixtureAppletonValueObject.totalEnergyUsed);

    var co2_emmission_value_MT = 0.000744;
    var co2_emmission_value_Pounds = 2204.62;
    var coal_emmission_value_MT = 0.000453592;
    var coal_emmission_value_Pounds = 0.000914;

    var lightingBolt_value = 6.672;
    var car_value = 0.000408;
    var tree = 0.85;

    //(Math.round(systemWatt * 100) / 100);
    var carbonValue1 = Comma(Math.round(energySaved * co2_emmission_value_MT * 100) / 100);
    var carbonValue2 = Comma(Math.round(carbonValue1 * co2_emmission_value_Pounds));
    var coalValue2 = Math.round(carbonValue1 / coal_emmission_value_Pounds);
    var coalValue1 = Comma((Math.round(coalValue2 * coal_emmission_value_MT * 100) / 100));
    var tree = Comma(Math.round(carbonValue1 / tree));
    var power = Comma(Math.round(carbonValue1 / lightingBolt_value));
    var car = Comma(Math.round(carbonValue1 / car_value));

    $("#redEnergy").text(Comma(energySaved));
    $("#carbon").text(carbonValue1);
    $("#carbon1").text(carbonValue2);
    $("#coal").text(coalValue1);
    $("#coal1").text(Comma(coalValue2));
    $("#tree").text(tree);
    $("#power").text(power);
    $("#car").text(car);
}

function showUpdateButton() {
    $(".updateInfo").show();
}

function resetFixture() {
    var configuration = $.cookie("configuration");
    var count = 0;
    var countData = 0;
    if (configuration == "existing") {
        count = 0;
        countData = 0;
    } else if (configuration == "appleton") {
        count = 1;
    } else if (configuration == "proposal") {
        count = 2;
        countData = 1;
    }


    var containerDetail = "";
    var isValid = true;
    if (configuration == "proposal") {
        containerDetail = "Container";
    } else {
        containerDetail = "ConfigurationContainer";
    }
    $.each($("#" + configuration + containerDetail + " .panel-body").eq(0).find("input"), function (key, value) {
        if (key != 0 && key != 1) {
            $("#" + configuration + containerDetail + " .panel-body").eq(0).find("input").eq(key).val("");
        }
    });
    if (count != 1) {
        $(".lamp").eq(countData).val("Select lamp")
    }
    else {
        $('#ddlLedSeries').ddslick('select', {
            index: 0
        });
        $(".seriespn").val("");
        $(".hidEquivalent").val("");
    }
    //setCurrentCaculationCookie();
    calculateExistingSummary();
    fixtureCompleteAction();

}

function BindAppletonLED() {
    var data;
    $.get(applicationurl + "/Data/AppletonLigthData.txt", function (dataResult) {
        var areaClass = $(".areaClass").val();

        data = JSON.parse(dataResult);
        //*******DDslick
        var dataLED = $.grep(data.Led, function (n, i) {
            if (areaClass == n.AreaClassification) {
                return n;
            }
        });
        data.Led = dataLED;
        var dataValue = [];
        var dataSet = {};
        dataSet.text = "Select fixture series";
        dataValue.push(dataSet);
        var selectedSeries = "";
        $.each(data.Led, function (i, value) {
            var dataSet = {};
            dataSet.text = value.Name;
            dataSet.imageSrc = applicationurl + "/Image/" + value.Image + ".jpg";
            dataSet.description = "<a target='_blank' href='" + value.ProductPage + "'>" + value.Description + "</a>";
            dataValue.push(dataSet);
        });
        $('#ddlLedSeries').ddslick('destroy');
        $('#ddlLedSeries').empty();
        $('#ddlLedSeries').ddslick({
            data: dataValue,
            width: 300,
            imagePosition: "left",
            onSelected: function (selectedData) {
                selectedSeries = selectedData.selectedData.text;
                $(':input').css("border-color", "");
                $(".warningInfo").hide();
                var series = $.grep(data.Led, function (n, i) {
                    if (selectedSeries == n.Name) {
                        return n;
                    }
                });

                if (series != null && series.length > 0) {
                    $(".productLink").attr("href", series[0].ProductPage);
                    $('.seriespn').find('option').remove();
                    $.each(series[0].Model, function (i, value) {
                        $('.seriespn').append($('<option>').text(value.ModelNo).attr('value', value.ModelNo));
                    });

                    $('.hidEquivalent').find('option').remove();
                    $.each(series[0].Model, function (i, value) {
                        $('.hidEquivalent').append($('<option>').text(value.HIDEquivalent).attr('value', value.HIDEquivalent));
                    });
                }
                if (series != null && series.length > 0) {
                    var systemWattage = $.grep(series[0].Model, function (n, i) {
                        if ($('.seriespn').find(":selected").text() == n.ModelNo) {
                            return n.SystemWattage;
                        }
                    });

                    if (systemWattage != null && systemWattage.length > 0) {
                        $(".appSystemWatt").val(systemWattage[0].SystemWattage);
                        $(".nominalLuments").eq(0).val(systemWattage[0].NominalLumens);
                    }

                }
                fixtureCompleteAction();

            }


        });
        //getCurrentCaculationCookie();
        calculateExistingSummary();
        $('.seriespn').change(function () {
            var series = $.grep(data.Led, function (n, i) {
                if (selectedSeries == n.Name) {
                    return n;
                }
            });
            if (series != null && series.length > 0) {
                var systemWattage = $.grep(series[0].Model, function (n, i) {
                    if ($('.seriespn').find(":selected").text() == n.ModelNo) {
                        return n.SystemWattage;
                    }
                });

                if (systemWattage != null && systemWattage.length > 0) {
                    $(".appSystemWatt").val(systemWattage[0].SystemWattage);
                    $(".nominalLuments").eq(0).val(systemWattage[0].NominalLumens);
                    $('.hidEquivalent').val(systemWattage[0].HIDEquivalent);
                }

            }


            calculateExistingSummary();

        });

        $('.hidEquivalent').change(function () {
            var series = $.grep(data.Led, function (n, i) {
                if (selectedSeries == n.Name) {
                    return n;
                }
            });
            if (series != null && series.length > 0) {
                var systemWattage = $.grep(series[0].Model, function (n, i) {
                    if ($('.hidEquivalent').find(":selected").text() == n.HIDEquivalent) {
                        return n.SystemWattage;
                    }
                });

                if (systemWattage != null && systemWattage.length > 0) {
                    $(".appSystemWatt").val(systemWattage[0].SystemWattage);
                    $(".nominalLuments").eq(0).val(systemWattage[0].NominalLumens);
                    $('.seriespn').val(systemWattage[0].ModelNo);
                }

            }
            calculateExistingSummary();


        });
        fixtureCompleteAction();

    });
}

function showAlternateProposal() {
    $(".showProposal").show();
    $(".btnShowProposal").hide();
    $(".btnHideProposal").show();

}

function hideAlternateProposal() {
    $(".showProposal").hide();
    $(".btnShowProposal").show();
    $(".btnHideProposal").hide();

}

function sendEmailToDistributor() {

    var reportObject = {};
    var Customer = {};
    Customer.CustomerName = $(".name").val();
    Customer.EmailAddress = $(".email").val();
    Customer.PhoneNumber = $(".phone").val();
    Customer.CompanyName = $(".company").val();
    Customer.CompanyAddress = $(".companyAddress").val();
    Customer.State = $(".state").val();
    Customer.Country = $(".country").val();
    Customer.PostalCode = $(".zip").val();

    reportObject.Customer = Customer;
    reportObject.isProposal = true;
    if ($('.showProposal').css("display") == "none") {
        reportObject.isProposal = false;
    }

    var Project = {};
    Project.ProjectName = $(".projectName").val();
    Project.InstallationType = $('.installationType input:radio:checked').val();
    var application = $(".application").val();
    if (application == "Other") {
        application = $(".applicationValue").val();
    }
    var currencyValue = $('.ddlcurrency').val();
    currencyValue = currencyValue.split("-")[0];

    Project.Industry = application;
    Project.Currency = currencyValue
    Project.EnergyCost = $(".energyRate").val();
    Project.TimePeriod = $(".timeperiod").val();

    reportObject.Project = Project;

    var Savings = {};
    var InitialInvestment = {};
    InitialInvestment.ExistingLightingSystem = (($(".existingNetInvestment").val()).replace(currencyValue, "")).replace(/\,/g, "");
    InitialInvestment.ExistingLightingSystemPercentage = ($(".existingNetInvestmentPercentage").val()).replace(/\%/g, "");
    InitialInvestment.AppletonLEDProposal = (($(".appletonNetInvestment").val()).replace(currencyValue, "")).replace(/\,/g, "");
    InitialInvestment.AppletonLEDProposalPercentage = ($(".appletonNetInvestmentPercentage").val()).replace(/\%/g, "");
    InitialInvestment.AlternativeProposal = (($(".proposalNetInvestment").val()).replace(currencyValue, "")).replace(/\,/g, "");
    InitialInvestment.AlternativeProposalPercentage = ($(".proposalNetInvestmentPercentage").val()).replace(/\%/g, "");

    //********updated code starts

    InitialInvestment.ExistingLightingSystemString = $(".existingNetInvestment").val();
    InitialInvestment.ExistingLightingSystemPercentageString = $(".existingNetInvestmentPercentage").val();
    InitialInvestment.AppletonLEDProposalString = $(".appletonNetInvestment").val();
    InitialInvestment.AppletonLEDProposalPercentageString = $(".appletonNetInvestmentPercentage").val();
    InitialInvestment.AlternativeProposalString = $(".proposalNetInvestment").val();
    InitialInvestment.AlternativeProposalPercentageString = $(".proposalNetInvestmentPercentage").val();

    //***************updated code ends

    Savings.InitialInvestment = InitialInvestment;

    var MaintenanceCosts = {};
    MaintenanceCosts.ExistingLightingSystem = (($(".existingFixtureMaintenance").val()).replace(currencyValue, "")).replace(/\,/g, "");
    MaintenanceCosts.ExistingLightingSystemPercentage = ($(".existingFixtureMaintenancePercentage").val()).replace(/\%/g, "");
    MaintenanceCosts.AppletonLEDProposal = (($(".appletonFixtureMaintenance").val()).replace(currencyValue, "")).replace(/\,/g, "");
    MaintenanceCosts.AppletonLEDProposalPercentage = ($(".appletonFixtureMaintenancePercentage").val()).replace(/\%/g, "");
    MaintenanceCosts.AlternativeProposal = (($(".proposalFixtureMaintenance").val()).replace(currencyValue, "")).replace(/\,/g, "");
    MaintenanceCosts.AlternativeProposalPercentage = ($(".proposalFixtureMaintenancePercentage").val()).replace(/\%/g, "");
    MaintenanceCosts.ExistingLightingSystemString = $(".existingFixtureMaintenance").val();
    MaintenanceCosts.ExistingLightingSystemPercentageString = $(".existingFixtureMaintenancePercentage").val();
    MaintenanceCosts.AppletonLEDProposalString = $(".appletonFixtureMaintenance").val();
    MaintenanceCosts.AppletonLEDProposalPercentageString = $(".appletonFixtureMaintenancePercentage").val();
    MaintenanceCosts.AlternativeProposalString = $(".proposalFixtureMaintenance").val();
    MaintenanceCosts.AlternativeProposalPercentageString = $(".proposalFixtureMaintenancePercentage").val();

    Savings.MaintenanceCosts = MaintenanceCosts;

    var EnergyCosts = {};
    EnergyCosts.ExistingLightingSystem = (($(".existingEnergyConsumed").val()).replace(currencyValue, "")).replace(/\,/g, "");
    EnergyCosts.ExistingLightingSystemPercentage = ($(".existingEnergyConsumedPercentage").val()).replace(/\%/g, "");
    EnergyCosts.AppletonLEDProposal = (($(".appletonEnergyConsumed").val()).replace(currencyValue, "")).replace(/\,/g, "");
    EnergyCosts.AppletonLEDProposalPercentage = ($(".appletonEnergyConsumedPercentage").val()).replace(/\%/g, "");
    EnergyCosts.AlternativeProposal = (($(".proposalEnergyConsumed").val()).replace(currencyValue, "")).replace(/\,/g, "");
    EnergyCosts.AlternativeProposalPercentage = ($(".proposalEnergyConsumedPercentage").val()).replace(/\%/g, "");
    EnergyCosts.ExistingLightingSystemString = $(".existingEnergyConsumed").val();
    EnergyCosts.ExistingLightingSystemPercentageString = $(".existingEnergyConsumedPercentage").val();
    EnergyCosts.AppletonLEDProposalString = $(".appletonEnergyConsumed").val();
    EnergyCosts.AppletonLEDProposalPercentageString = $(".appletonEnergyConsumedPercentage").val();
    EnergyCosts.AlternativeProposalString = $(".proposalEnergyConsumed").val();
    EnergyCosts.AlternativeProposalPercentageString = $(".proposalEnergyConsumedPercentage").val();
    Savings.EnergyCosts = EnergyCosts;

    var TotalCosts = {};
    TotalCosts.ExistingLightingSystem = (($(".existingTotalFixyureSummaryCost").val()).replace(currencyValue, "")).replace(/\,/g, "");
    TotalCosts.ExistingLightingSystemString = $(".existingTotalFixyureSummaryCost").val();
    TotalCosts.AppletonLEDProposal = (($(".appletonTotalFixyureSummaryCost").val()).replace(currencyValue, "")).replace(/\,/g, "");
    TotalCosts.AppletonLEDProposalString = $(".appletonTotalFixyureSummaryCost").val();
    TotalCosts.AlternativeProposal = (($(".proposalTotalFixyureSummaryCost").val()).replace(currencyValue, "")).replace(/\,/g, "");
    TotalCosts.AlternativeProposalString = $(".appletonTotalFixyureSummaryCost").val();

    Savings.TotalCosts = TotalCosts;

    var TotalSavings = {};
    TotalSavings.AppletonTotalSaving = $(".savingOverExisting").val();
    TotalSavings.ProposalTotalSaving = $(".savingOverExisting2").val();

    Savings.TotalSavings = TotalSavings;

    var InitialNetInvest = {};
    InitialNetInvest.AppletonTotalSaving = $(".initNetInvest").val();
    InitialNetInvest.ProposalTotalSaving = $(".initNetInvest2").val();

    Savings.InitialNetInvest = InitialNetInvest;

    var ROI = {};
    ROI.AppletonTotalSaving = $(".ROI").val();
    ROI.ProposalTotalSaving = $(".ROI2").val();

    Savings.ROI = ROI;

    var AvgSaving = {};
    AvgSaving.AppletonTotalSaving = $(".avgYearlySaving").val();
    AvgSaving.ProposalTotalSaving = $(".avgYearlySaving2").val();

    Savings.AvgSaving = AvgSaving;

    var PaybackPeriod = {};
    PaybackPeriod.AppletonTotalSaving = $(".paybackPeriod").val();
    PaybackPeriod.ProposalTotalSaving = $(".paybackPeriod2").val();
    Savings.PaybackPeriod = PaybackPeriod;

    var EnvironmentalImpact = {};
    EnvironmentalImpact.RedEnergy = $("#redEnergy").text();
    EnvironmentalImpact.SavedTree = $("#tree").text();
    EnvironmentalImpact.CO2MetricTon = $("#carbon").text();
    EnvironmentalImpact.CO2Pound = $("#carbon1").text();
    EnvironmentalImpact.CoalEmissionMetricTon = $("#coal").text();
    EnvironmentalImpact.CoalEmissionPound = $("#coal1").text();
    EnvironmentalImpact.SavedElectricity = $("#power").text();
    EnvironmentalImpact.Car = $("#car").text();
    reportObject.EnvironmentalImpact = EnvironmentalImpact;

    reportObject.Savings = Savings;
    reportObject.isBCCAllowed = $(".chkbxAllow").prop("checked");

    var settings = {
        "async": true,
        "crossDomain": true,
        //"url": "http://10.69.86.153/api/SendEmailToUser",
        "url": "https://jolly-ground-09ac8eb0f.5.azurestaticapps.net/api/SendEmailToUser",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "084685ba-951c-933b-bc01-8178193ec362"
        },
        "processData": false,
        "data": JSON.stringify(reportObject)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function downloadReportAsPDF() {

    var reportObject = {};
    var Customer = {};
    Customer.CustomerName = $(".name").val();
    Customer.EmailAddress = $(".email").val();
    Customer.PhoneNumber = $(".phone").val();
    Customer.CompanyName = $(".company").val();
    Customer.CompanyAddress = $(".companyAddress").val();
    Customer.State = $(".state").val();
    Customer.Country = $(".country").val();
    Customer.PostalCode = $(".zip").val();

    reportObject.Customer = Customer;
    reportObject.isProposal = true;
    if ($('.showProposal').css("display") == "none") {
        reportObject.isProposal = false;
    }

    var Project = {};
    Project.ProjectName = $(".projectName").val();
    Project.InstallationType = $('.installationType input:radio:checked').val();
    var application = $(".application").val();
    if (application == "Other") {
        application = $(".applicationValue").val();
    }
    var currencyValue = $('.ddlcurrency').val();
    currencyValue = currencyValue.split("-")[0];

    Project.Industry = application;
    Project.Currency = currencyValue
    Project.EnergyCost = $(".energyRate").val();
    Project.TimePeriod = $(".timeperiod").val();

    reportObject.Project = Project;

    var Savings = {};
    var InitialInvestment = {};
    InitialInvestment.ExistingLightingSystem = (($(".existingNetInvestment").val()).replace(currencyValue, "")).replace(/\,/g, "");
    InitialInvestment.ExistingLightingSystemPercentage = ($(".existingNetInvestmentPercentage").val()).replace(/\%/g, "");
    InitialInvestment.AppletonLEDProposal = (($(".appletonNetInvestment").val()).replace(currencyValue, "")).replace(/\,/g, "");
    InitialInvestment.AppletonLEDProposalPercentage = ($(".appletonNetInvestmentPercentage").val()).replace(/\%/g, "");
    InitialInvestment.AlternativeProposal = (($(".proposalNetInvestment").val()).replace(currencyValue, "")).replace(/\,/g, "");
    InitialInvestment.AlternativeProposalPercentage = ($(".proposalNetInvestmentPercentage").val()).replace(/\%/g, "");

    //********updated code starts

    InitialInvestment.ExistingLightingSystemString = $(".existingNetInvestment").val();
    InitialInvestment.ExistingLightingSystemPercentageString = $(".existingNetInvestmentPercentage").val();
    InitialInvestment.AppletonLEDProposalString = $(".appletonNetInvestment").val();
    InitialInvestment.AppletonLEDProposalPercentageString = $(".appletonNetInvestmentPercentage").val();
    InitialInvestment.AlternativeProposalString = $(".proposalNetInvestment").val();
    InitialInvestment.AlternativeProposalPercentageString = $(".proposalNetInvestmentPercentage").val();

    //***************updated code ends

    Savings.InitialInvestment = InitialInvestment;

    var MaintenanceCosts = {};
    MaintenanceCosts.ExistingLightingSystem = (($(".existingFixtureMaintenance").val()).replace(currencyValue, "")).replace(/\,/g, "");
    MaintenanceCosts.ExistingLightingSystemPercentage = ($(".existingFixtureMaintenancePercentage").val()).replace(/\%/g, "");
    MaintenanceCosts.AppletonLEDProposal = (($(".appletonFixtureMaintenance").val()).replace(currencyValue, "")).replace(/\,/g, "");
    MaintenanceCosts.AppletonLEDProposalPercentage = ($(".appletonFixtureMaintenancePercentage").val()).replace(/\%/g, "");
    MaintenanceCosts.AlternativeProposal = (($(".proposalFixtureMaintenance").val()).replace(currencyValue, "")).replace(/\,/g, "");
    MaintenanceCosts.AlternativeProposalPercentage = ($(".proposalFixtureMaintenancePercentage").val()).replace(/\%/g, "");
    MaintenanceCosts.ExistingLightingSystemString = $(".existingFixtureMaintenance").val();
    MaintenanceCosts.ExistingLightingSystemPercentageString = $(".existingFixtureMaintenancePercentage").val();
    MaintenanceCosts.AppletonLEDProposalString = $(".appletonFixtureMaintenance").val();
    MaintenanceCosts.AppletonLEDProposalPercentageString = $(".appletonFixtureMaintenancePercentage").val();
    MaintenanceCosts.AlternativeProposalString = $(".proposalFixtureMaintenance").val();
    MaintenanceCosts.AlternativeProposalPercentageString = $(".proposalFixtureMaintenancePercentage").val();

    Savings.MaintenanceCosts = MaintenanceCosts;

    var EnergyCosts = {};
    EnergyCosts.ExistingLightingSystem = (($(".existingEnergyConsumed").val()).replace(currencyValue, "")).replace(/\,/g, "");
    EnergyCosts.ExistingLightingSystemPercentage = ($(".existingEnergyConsumedPercentage").val()).replace(/\%/g, "");
    EnergyCosts.AppletonLEDProposal = (($(".appletonEnergyConsumed").val()).replace(currencyValue, "")).replace(/\,/g, "");
    EnergyCosts.AppletonLEDProposalPercentage = ($(".appletonEnergyConsumedPercentage").val()).replace(/\%/g, "");
    EnergyCosts.AlternativeProposal = (($(".proposalEnergyConsumed").val()).replace(currencyValue, "")).replace(/\,/g, "");
    EnergyCosts.AlternativeProposalPercentage = ($(".proposalEnergyConsumedPercentage").val()).replace(/\%/g, "");
    EnergyCosts.ExistingLightingSystemString = $(".existingEnergyConsumed").val();
    EnergyCosts.ExistingLightingSystemPercentageString = $(".existingEnergyConsumedPercentage").val();
    EnergyCosts.AppletonLEDProposalString = $(".appletonEnergyConsumed").val();
    EnergyCosts.AppletonLEDProposalPercentageString = $(".appletonEnergyConsumedPercentage").val();
    EnergyCosts.AlternativeProposalString = $(".proposalEnergyConsumed").val();
    EnergyCosts.AlternativeProposalPercentageString = $(".proposalEnergyConsumedPercentage").val();
    Savings.EnergyCosts = EnergyCosts;

    var TotalCosts = {};
    TotalCosts.ExistingLightingSystem = (($(".existingTotalFixyureSummaryCost").val()).replace(currencyValue, "")).replace(/\,/g, "");
    TotalCosts.ExistingLightingSystemString = $(".existingTotalFixyureSummaryCost").val();
    TotalCosts.AppletonLEDProposal = (($(".appletonTotalFixyureSummaryCost").val()).replace(currencyValue, "")).replace(/\,/g, "");
    TotalCosts.AppletonLEDProposalString = $(".appletonTotalFixyureSummaryCost").val();
    TotalCosts.AlternativeProposal = (($(".proposalTotalFixyureSummaryCost").val()).replace(currencyValue, "")).replace(/\,/g, "");
    TotalCosts.AlternativeProposalString = $(".appletonTotalFixyureSummaryCost").val();

    Savings.TotalCosts = TotalCosts;

    var TotalSavings = {};
    TotalSavings.AppletonTotalSaving = $(".savingOverExisting").val();
    TotalSavings.ProposalTotalSaving = $(".savingOverExisting2").val();

    Savings.TotalSavings = TotalSavings;

    var InitialNetInvest = {};
    InitialNetInvest.AppletonTotalSaving = $(".initNetInvest").val();
    InitialNetInvest.ProposalTotalSaving = $(".initNetInvest2").val();

    Savings.InitialNetInvest = InitialNetInvest;

    var ROI = {};
    ROI.AppletonTotalSaving = $(".ROI").val();
    ROI.ProposalTotalSaving = $(".ROI2").val();

    Savings.ROI = ROI;

    var AvgSaving = {};
    AvgSaving.AppletonTotalSaving = $(".avgYearlySaving").val();
    AvgSaving.ProposalTotalSaving = $(".avgYearlySaving2").val();

    Savings.AvgSaving = AvgSaving;

    var PaybackPeriod = {};
    PaybackPeriod.AppletonTotalSaving = $(".paybackPeriod").val();
    PaybackPeriod.ProposalTotalSaving = $(".paybackPeriod2").val();
    Savings.PaybackPeriod = PaybackPeriod;

    var EnvironmentalImpact = {};
    EnvironmentalImpact.RedEnergy = $("#redEnergy").text();
    EnvironmentalImpact.SavedTree = $("#tree").text();
    EnvironmentalImpact.CO2MetricTon = $("#carbon").text();
    EnvironmentalImpact.CO2Pound = $("#carbon1").text();
    EnvironmentalImpact.CoalEmissionMetricTon = $("#coal").text();
    EnvironmentalImpact.CoalEmissionPound = $("#coal1").text();
    EnvironmentalImpact.SavedElectricity = $("#power").text();
    EnvironmentalImpact.Car = $("#car").text();
    reportObject.EnvironmentalImpact = EnvironmentalImpact;

    reportObject.Savings = Savings;

    var settings = {
        "async": false,
        "crossDomain": true,
        //"url": "http://10.69.86.153/api/DownloadReportPDF",
        "url": "https://jolly-ground-09ac8eb0f.5.azurestaticapps.net/api/DownloadReportPDF",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(reportObject)
    }

    $.ajax(settings).done(function (response) {
        var fileByte = base64ToArrayBuffer(response);
        saveByteArray("AppletonLightingConfiguratorReport", fileByte);

    });
}

function doALoadOfStuff() {
    $(document).ready(function () {
        $(".btnPrev").eq(1).click();
        $(".slider-inner").css("width", "100%");
        $(".slide").css("width", "0px");
        var sliderEl = $('.slider-wrapper');
        if (sliderEl.size() >= 1) {
            var offset = 0;
            sliderEl.find('.slide').each(function () {
                $(this).data("offset", offset);
                $(this).css({ "width": $('.slider-inner').width() + "px" });
                offset += $(this).outerWidth(true);
            });
            $('.slider-inner').css({ "width": offset + 'px' });
            $('.slide-show').on("click", function () {
                var target = $(this).data("slide");
                var offset = $('.slide.' + target).data('offset');
                $('.slider-inner').animate({
                    left: '-' + offset + 'px'
                });
                //alert(offset + ' ' + $('.slide.'+target).width());
            });
        }
    });
}

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte]);
    var link = document.createElement('a');
    var fileName = reportName + ".pdf";
    if (navigator.appVersion.toString().indexOf('.NET') > 0) { // for IE browser
        window.navigator.msSaveBlob(blob, fileName);
    } else { // for other browsers
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }


};

function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function PushCustomerInfoToELQ() {
    var name = $(".name").val();
    var lastName = $(".lastName").val();
    var email = $(".email").val();
    var phone = $(".phone").val();
    var company = $(".company").val();
    var companyAddress = $(".companyAddress").val();
    var state = $(".state").val();
    var country = $(".country").val();
    var zip = $(".zip").val();
    var projectName = $(".projectName").val();
    var installationType = $('.installationType input:radio:checked').val();
    var application = $(".application").val();
    if (application == "Other") {
        application = "Other" + $(".applicationValue").val();
    }
    var currency = $(".ddlcurrency").val();
    var energyRate = $(".energyRate").val();
    var timeperiod = $(".timeperiod").val();
    CreateRow('Contact Info: ', GetElqContentPersonalizationValue(''));
    CreateRow('First Name: ', GetElqContentPersonalizationValue(name));
    CreateRow('Last Name: ', GetElqContentPersonalizationValue(lastName));
    CreateRow('Email Address: ', GetElqContentPersonalizationValue(email));
    // CreateRow('Salesperson: ', GetElqContentPersonalizationValue('C_Salesperson'));
    CreateRow('Company: ', GetElqContentPersonalizationValue(company));
    CreateRow('Address 1: ', GetElqContentPersonalizationValue(companyAddress));
    // CreateRow('City: ', GetElqContentPersonalizationValue('C_City'));
    CreateRow('State or Province: ', GetElqContentPersonalizationValue(state));
    CreateRow('Zip or Postal Code: ', GetElqContentPersonalizationValue(zip));
    CreateRow('Business Phone: ', GetElqContentPersonalizationValue(phone));
    CreateRow('Country: ', GetElqContentPersonalizationValue(country));
    CreateRow('Company Info: ', GetElqContentPersonalizationValue(''));
    CreateRow('Checkbox: ', GetElqContentPersonalizationValue(company));
    CreateRow('Industry: ', GetElqContentPersonalizationValue(application));
    //CreateRow('Revenue: ', GetElqContentPersonalizationValue('M_Revenue1'));
    CreateRow('WebSite: ', GetElqContentPersonalizationValue('Appleton'));
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' +
        (('' + day).length < 2 ? '0' : '') + day;

    CreateRow('Date Created: ', GetElqContentPersonalizationValue(output));
    _elqQ.push(['elqDataLookup', escape('434C5E6250C04FCBB0D4FC5413F9A40A'), email]);
}

function CreateRow(label, value) {
    var p = document.createElement('p');
    var b = document.createElement('b');
    var label = document.createTextNode(label);
    var value = document.createTextNode(value);
    p.appendChild(b);
    b.appendChild(label);
    p.appendChild(value);

    document.getElementById('contactinfo').appendChild(p);
}

function insertCookieCode() {
    // Default Options
    var options = {
        domain: null,
        expires: 7,
        path: "/"
    };

    // Create or update a cooke
    function _set(key, value, options) {
        var date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        var path = "; path=" + options.path;
        var domain = (options.domain !== null) ? "; domain=" + options.domain : "";
        document.cookie = key + "=" + value + expires + domain + path;
    }

    // Read a cookie
    function _get(key) {
        var keyString = key + "=";
        var cookieArray = document.cookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(keyString) === 0) return cookie.substring(keyString.length, cookie.length);
        }
        return null;
    }


    // Erase a cookie
    function _delete(key) {
        _set(key, "", $.extend({}, options, {
            expires: -1
        }));
    }

    // Define Plugin
    $.cookie = function (key, value, opts) {
        // Set defaults
        if (typeof key === "object") {
            options = $.extend(options, key);
            return null;
        } else {
            // Override defaults
            opts = $.extend(options, opts);
        }

        // Delegate intent
        if (typeof key !== "undefined") {
            if (typeof value !== "undefined") {
                if (value === null) {
                    _delete(key);
                } else {
                    _set(key, value, opts);
                }
            } else {
                return _get(key);
            }
        }
    };
}