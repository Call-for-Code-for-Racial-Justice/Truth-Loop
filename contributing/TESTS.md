# Basic Test Guide

This is just a guide. You may need to do things differently but hopefully this will help.

Most tests are made up of 3 parts. 
* Arrange
* Act
* Assert

```javascript
import functionToTest from './aLibrary'

describe('<name of thing being tested> Tests', () => {
  let actualResult, someLibrarySomeFunctionSpy
  describe('When doing something', () => {
    beforeEach(() => {
      // TODO Arrange      
      // TODO Mock any dependencies (http, db queries, other 'imported' libraries)
      // TODO Set up any spies
      someLibrarySomeFunctionSpy = jest.spyOn(someLibrary, 'someFunction')
      // TODO Act
      actualResult = functionToTest()
    })
    it('should <first assertion>', () => {
      expect(actualResult).toBe(43)
    })
    it('should <second assertion>', () => {
      // TODO Maybe you're testing side effects
      expect(calculatorAddSpy).toBeCalledWith(42)
    })
  })
})
```
* Wrapping your entire test file in a `describe` help with scoping.
* Each scenario should get its own `describe`.
* When testing multiple functions of some library you may want a `describe` around all the scenarios pertaining to that function.
* Putting your Arranging and Acting in a `beforeEach` allows the data to be set up at the correct time and to be done each time.  
* Most of the time you want your assertions separate so if multiple things fail you can see all failures.  
* Delete all those comments! :)

Testing async functions? No worries just prefix your anonymous function with `async` and `await` the result:
```javascript
    beforeEach(async () => {
      actualResult = await asyncFunctionToTest()
    })
```