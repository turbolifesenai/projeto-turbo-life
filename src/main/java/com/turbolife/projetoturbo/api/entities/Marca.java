package com.turbolife.projetoturbo.api.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tb_marcas")
public class Marca {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "O nome é obrigatório!")
	@Column(nullable = false)
	private String nome;
	
	@NotBlank(message = "O país de origem é obrigatório!")
	@Column(nullable = false)
	private String paisDeOrigem;
	
	@Column(name = "logo_url")
	private String logoUrl;
	
	@JsonIgnore // Evita loop infinito ao transformar em JSON
    @OneToMany(mappedBy = "marca") // "marca" refere-se ao nome do atributo na classe Carro
    private List<Carro> carros = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getPaisDeOrigem() {
		return paisDeOrigem;
	}

	public void setPaisDeOrigem(String paisDeOrigem) {
		this.paisDeOrigem = paisDeOrigem;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}
	
	// Getter e Setter para a lista
    public List<Carro> getCarros() {
        return carros;
    }

    public void setCarros(List<Carro> carros) {
        this.carros = carros;
    }
}
	

