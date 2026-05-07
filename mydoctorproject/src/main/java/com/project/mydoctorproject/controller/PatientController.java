package com.project.mydoctorproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.mydoctorproject.model.Patient;
import com.project.mydoctorproject.model.Review;
import com.project.mydoctorproject.service.PatientService;

@RestController
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping("getallPatient")
    public List<Patient> getallPatient(){
        return  patientService.getallPatient();
    }
    @PostMapping("savepatient")
    public Patient savePatient(@RequestBody Patient patient){
        return patientService.savePatient(patient);
    }
    @GetMapping("getPatientById/{id}")
    public Patient getPatientById(@PathVariable int id) {
        return patientService.getPatientById(id);
    }
    @PutMapping("updatePatient/{id}")
    public Patient update(@PathVariable int id,@RequestBody Patient updatep){
        return patientService.updatePatient(id, updatep);
    }
    @DeleteMapping("deletePatient/{id}")
    public String delete(@PathVariable int id){
        return patientService.deletePatient(id);
    }
}
