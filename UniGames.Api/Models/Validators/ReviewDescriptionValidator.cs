using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.Validators
{
    public class ReviewDescriptionValidator : ValidationAttribute
    {
        

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var description = value.ToString();
            if (description.StartsWith("shit"))
            {
                return new ValidationResult("Please do not use bad language for a review");
            }

            return ValidationResult.Success;
        }
    }
}
