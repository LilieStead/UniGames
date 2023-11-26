using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.Validators
{
    public class ReviewDescriptionValidator : ValidationAttribute
    {
        

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string[] profanities = { "shit", "fuck", "cunt", "fag", "faggot", "ass", "arse", "bullshit" };

            var description = value.ToString().ToLower();
            if (profanities.Any(word => description.Contains(word)))
            {
                return new ValidationResult("Please do not use bad language for a review");
            }
            if (description.Length < 20)
            {
                return new ValidationResult("Please make sure your reviews are over 20 characters");
            }
           
            
            return ValidationResult.Success;
            

            
        }
    }
}
