using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Common
{
    public class Result<T>
    {
        public Result(bool isSuccess, T value, string error = null)
        {
            IsSuccess = isSuccess;
            Value = value;
            Error = error;
        }

        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
    }
}